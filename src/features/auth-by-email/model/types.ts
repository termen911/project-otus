export type LoginDto = {
  email: string;
  password: string;
};

export type LoginFormValues = LoginDto;

export type RegisterDto = LoginDto & {
  commandId: string;
};

export type RegisterFormValues = RegisterDto;
