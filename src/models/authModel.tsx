// authTypes.ts

export interface AuthState {
    isLoggedIn: boolean;
    isSuccessful: boolean;
    user: UserData; // Replace YourUserType with the actual user type
    message: string;
    roles: any[]; // Replace 'any[]' with the actual type for roles
    role: any; // Replace 'any' with the actual type for role
  }

 export interface UserRole {
    user_id: number;
    role_id: number;
  }
  export interface UserData {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }  

  export interface RegisterUserModel {
    username: string,
    password:string,
    password_confirmation: string,
    email: string,
  }

  export interface ResetPasswdUserData {
        password: string,
        password_confirmation: string,
        reset_password_token: string | undefined,
  }  

  export interface loginUserInfo {
        email: string,
        password: string,
  }  