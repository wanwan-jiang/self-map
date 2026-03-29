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
interface RegisterApiSuccess {
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
  submitForm: () => Promise<RegisterApiSuccess | RegisterApiFailBody | false>;
}

/** 注册表单向父级同步弹窗显示状态 */
export interface RegisterShowUpdatePayload {
  show: boolean;
  message?: string;
}

export type { RegisterFormState, RegisterFormErrors, RegisterApiSuccess, RegisterApiFailBody, UseRegisterFormReturn };
