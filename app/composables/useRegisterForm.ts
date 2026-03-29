/**
 * @description 注册表单验证逻辑
 */
import { userFormRegisterSchema } from "../../validators/user";

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

interface UseRegisterFormReturn {
  form: Ref<RegisterFormState>;
  errors: Ref<RegisterFormErrors>;
  isSubmitting: Ref<boolean>;
  submitForm: () => Promise<object | boolean>;
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
      nextErrors.username = result.error.format().username?._errors[0];
      nextErrors.email = result.error.format().email?._errors[0];
      nextErrors.password = result.error.format().password?._errors[0];
      nextErrors.confirmPassword = result.error.format().confirmPassword?._errors[0];
      nextErrors.agreeTerms = result.error.format().agreeTerms?._errors[0];
    }

    errors.value = nextErrors;
    return Object.keys(nextErrors).length === 0;
  };

  const submitForm = async (): Promise<object | boolean> => {
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
