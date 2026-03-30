/**
 * @description 用户登录 HTTP 接口：校验请求体；校验通过后应核对凭证并签发会话，禁止日志输出明文密码
 */
import { flattenError } from "zod";
import { userFormLoginSchema } from "../../../validators/user";
import { Users } from "../../db/users";

interface LoginSuccessBody {
  success: true;
  data: {
    username: string;
    /** 会话标识，与 Set-Cookie 中的加密会话配合使用；客户端也可按需持久化 */
    token: string;
  };
}

interface LoginErrorBody {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export default defineEventHandler(async (event): Promise<LoginSuccessBody | LoginErrorBody> => {
  let body: unknown;
  try {
    body = await readBody(event);
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: "无效的 JSON 请求体",
    });
  }

  const parsed = userFormLoginSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors, formErrors } = flattenError(parsed.error);

    setResponseStatus(event, 400);
    return {
      success: false,
      message: formErrors[0] ?? "请求参数无效",
      fieldErrors,
    };
  }

  const { username, password } = parsed.data;

  const user = await Users.findOne({ username });
  if (!user) {
    setResponseStatus(event, 401);
    return {
      success: false,
      message: "该用户不存在",
    };
  }

  const passwordOk = await verifyPassword(user.password, password);
  if (!passwordOk) {
    setResponseStatus(event, 401);
    return {
      success: false,
      message: "密码输入错误",
    };
  }

  await setUserSession(event, {
    user: {
      username: user.username,
    },
    loggedInAt: new Date(),
  });

  const session = await getUserSession(event);
  const token = session.id ?? "";

  return {
    success: true,
    data: {
      username,
      token,
    },
  };
});
