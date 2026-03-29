/**
 * @description 用户登录 HTTP 接口：校验请求体；校验通过后应核对凭证并签发会话，禁止日志输出明文密码
 */
import { flattenError } from "zod";
import { userFormLoginSchema } from "../../../validators/user";

interface LoginSuccessBody {
  success: true;
  data: {
    username: string;
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

  const { username } = parsed.data;

  // TODO: 按 username 查库、用安全比较校验密码哈希；失败时返回 401 与统一文案（避免枚举用户）；成功时签发 session/JWT（禁止日志明文密码）

  return {
    success: true,
    data: {
      username,
    },
  };
});
