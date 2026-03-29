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

  const submitForm = async (): Promise<boolean | object> => {
    if (!validate()) {
      return false;
    }

    isSubmitting.value = true;
    try {
      const result = await new Promise<object>((resolve) =>
        setTimeout(() => resolve({ data: { success: true } }), 600),
      );
      return result;
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
