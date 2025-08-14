export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: string;
  commandId: string;
};

export type UpdateProfileDto = {
  name?: string;
};

export type ChangePasswordDto = {
  password: string;
  newPassword: string;
};

export type ChangePasswordResult = {
  success: boolean;
};
