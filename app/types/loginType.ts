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
  submitForm: () => Promise<LoginApiSuccess | LoginApiFailBody | false>;
}

interface LoginApiSuccess {
  success: true;
  data: {
    username: string;
    token: string;
    userId: string;
  };
}

interface LoginApiFailBody {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

type LoginShowUpdatePayload = {
  show: boolean;
  message?: string;
};

export type {
  LoginFormState,
  LoginFormErrors,
  UseLoginFormReturn,
  LoginApiSuccess,
  LoginApiFailBody,
  LoginShowUpdatePayload,
};
