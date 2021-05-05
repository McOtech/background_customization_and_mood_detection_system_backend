export interface CreateUserInterface {
  _id?: string;
  username: string;
  password?: string;
  updated_at?: string;
  created_at?: string;
}

// export interface UpdateUserEmailInterface {
//   username: string;
//   newEmail: string;
//   oldEmail: string;
//   password: string;
// }

// export interface ResetUserPasswordInterface {
//   username: string;
//   newPassword: string;
//   oldPassword: string;
// }

export interface UserInterface {
  _id?: string;
  username: string;
  profileId?: string;
  password?: string;
  updated_at?: string;
  created_at?: string;
}

// export interface AuthUserInterface {
//   id?: string;
//   username: string;
//   email: string;
//   password: string;
//   type: string;
//   isVerified: boolean;
//   updated_at: number;
//   created_at: number;
// }

// export interface UpdateUserTypeInterface {
//   clientId: string;
//   type: string;
//   adminPassword: string;
// }
