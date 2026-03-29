/**
 * @description 注册表单验证逻辑
 */
import { flattenError } from "zod";
import { userFormRegisterSchema } from "../../../validators/user";

interface RegisterFormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface RegisterFormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

/** 与 server/api/user/register.post 成功响应一致 */
export interface RegisterApiSuccess {
  success: true;
  data: {
    username: string;
    email: string;
  };
}

interface RegisterApiFailBody {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

interface UseRegisterFormReturn {
  form: Ref<RegisterFormState>;
  errors: Ref<RegisterFormErrors>;
  isSubmitting: Ref<boolean>;
  submitForm: () => Promise<RegisterApiSuccess | false>;
}

export const useRegisterForm = (): UseRegisterFormReturn => {
  const form = ref<RegisterFormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const errors = ref<RegisterFormErrors>({});
  const isSubmitting = ref<boolean>(false);

  const validate = (): boolean => {
    const nextErrors: RegisterFormErrors = {};

    const result = userFormRegisterSchema.safeParse(form.value);
    if (!result.success) {
      const { fieldErrors } = flattenError(result.error);
      nextErrors.username = fieldErrors.username?.[0];
      nextErrors.email = fieldErrors.email?.[0];
      nextErrors.password = fieldErrors.password?.[0];
      nextErrors.confirmPassword = fieldErrors.confirmPassword?.[0];
      nextErrors.agreeTerms = fieldErrors.agreeTerms?.[0];
    }

    errors.value = nextErrors;
    return Object.keys(nextErrors).length === 0;
  };

  const submitForm = async (): Promise<RegisterApiSuccess | false> => {
    if (!validate()) {
      return false;
    }

    isSubmitting.value = true;
    try {
      const result = await $fetch<RegisterApiSuccess>("/api/user/register", {
        method: "POST",
        body: form.value,
      });
      if (result.success) {
        return result;
      }
      return false;
    } catch (e: unknown) {
      const err = e as { statusCode?: number; data?: unknown };
      const code = err.statusCode;
      if (code === 400 && err.data && typeof err.data === "object") {
        const body = err.data as RegisterApiFailBody;
        if (body.fieldErrors) {
          const fe = body.fieldErrors;
          errors.value = {
            username: fe.username?.[0],
            email: fe.email?.[0],
            password: fe.password?.[0],
            confirmPassword: fe.confirmPassword?.[0],
            agreeTerms: fe.agreeTerms?.[0],
          };
        }
        return false;
      }
      if (code === 404) {
        errors.value = {
          email: "注册接口未找到：请用 npm run dev（nuxt dev）启动，并重启一次开发服务",
        };
        return false;
      }
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    form,
    errors,
    isSubmitting,
    submitForm,
  };
};
