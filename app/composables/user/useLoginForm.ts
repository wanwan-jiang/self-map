/**
 * @description 登录表单验证逻辑
 */
import { userFormLoginSchema } from "../../../validators/user";
import { flattenError } from "zod";

interface LoginFormState {
  username: string;
  password: string;
}

interface LoginFormErrors {
  username?: string;
  password?: string;
}

interface UseLoginFormReturn {
  form: Ref<LoginFormState>;
  errors: Ref<LoginFormErrors>;
  isSubmitting: Ref<boolean>;
  submitForm: () => Promise<boolean | object>;
}

interface LoginApiSuccess {
  success: true;
  data: {
    username: string;
  };
}

interface LoginApiFailBody {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const form = ref<LoginFormState>({
    username: "",
    password: "",
  });

  const errors = ref<LoginFormErrors>({});
  const isSubmitting = ref<boolean>(false);

  const validate = (): boolean => {
    const nextErrors: LoginFormErrors = {};

    const result = userFormLoginSchema.safeParse(form.value);
    if (!result.success) {
      const { fieldErrors } = flattenError(result.error);
      nextErrors.username = fieldErrors.username?.[0];
      nextErrors.password = fieldErrors.password?.[0];
    }

    errors.value = nextErrors;
    return Object.keys(nextErrors).length === 0;
  };

  const submitForm = async (): Promise<LoginApiSuccess | false> => {
    if (!validate()) {
      return false;
    }

    isSubmitting.value = true;
    try {
      const result = await $fetch<LoginApiSuccess>("/api/user/login", {
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
        const body = err.data as LoginApiFailBody;
        if (body.fieldErrors) {
          const fe = body.fieldErrors;
          errors.value = {
            username: fe.username?.[0],
            password: fe.password?.[0],
          };
        }
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
