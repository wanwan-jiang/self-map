/**
 * @description 登录表单验证逻辑
 */
import { userFormLoginSchema } from "../../../validators/user";
import { flattenError } from "zod";
import type {
  LoginFormState,
  LoginFormErrors,
  UseLoginFormReturn,
  LoginApiSuccess,
  LoginApiFailBody,
} from "../../types/loginType";
import { setAuthToken, setAuthUserId, setAuthUsername } from "../../utils/authToken";

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

  const submitForm = async (): Promise<LoginApiSuccess | LoginApiFailBody | false> => {
    if (!validate()) {
      return false;
    }

    isSubmitting.value = true;
    try {
      const result = await $fetch<LoginApiSuccess>("/api/user/login", {
        method: "POST",
        body: form.value,
      });
      if (result.data.token) {
        setAuthToken(result.data.token);
      }
      setAuthUsername(result.data.username);
      if (result.data.userId) {
        setAuthUserId(result.data.userId);
      }
      return result;
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
      return err.data as LoginApiFailBody;
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
