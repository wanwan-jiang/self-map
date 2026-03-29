/**
 * @description 登录表单验证逻辑
 */
import { userFormLoginSchema } from "../../../validators/user";
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
      nextErrors.username = result.error.format().username?._errors[0];
      nextErrors.password = result.error.format().password?._errors[0];
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
