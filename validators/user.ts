import { z } from "zod";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const userFormRegisterSchema = z
  .object({
    username: z.string().min(1, { message: "请输入用户名" }),
    email: z.string().regex(EMAIL_PATTERN, { message: "请输入有效邮箱地址" }),
    password: z.string().regex(PASSWORD_PATTERN, { message: "密码需包含英文和数字，且至少 8 位" }),
    confirmPassword: z.string().regex(PASSWORD_PATTERN, { message: "密码需包含英文和数字，且至少 8 位" }),
    agreeTerms: z.boolean().refine((value) => value, { message: "请先同意服务条款和隐私政策" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "两次密码输入不一致",
    path: ["confirmPassword"],
  });

const userFormLoginSchema = z.object({
  username: z.string().min(1, { message: "请输入用户名" }),
  password: z.string().regex(PASSWORD_PATTERN, { message: "密码需包含英文和数字，且至少 8 位" }),
});

export { userFormRegisterSchema, userFormLoginSchema };
