/**
 * @description 用户注册 HTTP 接口：校验请求体；持久化前应对密码做单向哈希并查重，禁止日志输出明文密码
 */
import { flattenError } from "zod";
import { userFormRegisterSchema } from "../../../validators/user";
import { Users } from "../../db/users";

interface RegisterSuccessBody {
  success: true;
  data: {
    username: string;
    email: string;
  };
}

interface RegisterErrorBody {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export default defineEventHandler(async (event): Promise<RegisterSuccessBody | RegisterErrorBody> => {
  let body: unknown;
  try {
    body = await readBody(event);
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: "无效的 JSON 请求体",
    });
  }

  const parsed = userFormRegisterSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors, formErrors } = flattenError(parsed.error);

    setResponseStatus(event, 400);
    return {
      success: false,
      message: formErrors[0] ?? "请求参数无效",
      fieldErrors,
    };
  }

  const { username, email, agreeTerms } = parsed.data;

  const existing = await Users.findOne({
    $or: [{ email }, { username }],
  });
  if (existing) {
    setResponseStatus(event, 409);
    return {
      success: false,
      message: existing.email === email ? "该邮箱已被注册" : "该用户名已被占用",
    };
  }

  const hashedPassword = await hashPassword(parsed.data.password);

  await Users.create({
    username,
    email,
    password: hashedPassword,
    agreeTerms,
    createdAt: new Date(),
  });

  return {
    success: true,
    data: {
      username,
      email,
    },
  };
});
