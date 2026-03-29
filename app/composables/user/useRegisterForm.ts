/**
 * @description 注册表单验证逻辑
 */
import { flattenError } from "zod";
import { userFormRegisterSchema } from "../../../validators/user";

import type {
  RegisterFormState,
  RegisterFormErrors,
  RegisterApiSuccess,
  RegisterApiFailBody,
  UseRegisterFormReturn,
} from "../../types/registerType";

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

  const submitForm = async (): Promise<RegisterApiSuccess | RegisterApiFailBody | false> => {
    if (!validate()) {
      return false;
    }

    isSubmitting.value = true;
    try {
      const result = await $fetch<RegisterApiSuccess>("/api/user/register", {
        method: "POST",
        body: form.value,
      });
      return result;
    } catch (e: unknown) {
      const err = e as { statusCode?: number; data?: unknown };
      const code = err.statusCode;
      if (code === 400 && err.data && typeof err.data === "object") {
        const body = err.data as RegisterApiFailBody;
        console.log("body3333333333333", body);
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
      return err.data as RegisterApiFailBody;
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
