export interface AuthToken {
  userId: string;
}

export interface AuthCredentials {
  username?: string;
  password: string;
  email?: string;
}

export interface LoginCredentials extends AuthCredentials { }

export interface SignupCredentials extends AuthCredentials { }

export interface LoginUserProps {
  loginCredentials: LoginCredentials;
}

export interface SignupUserProps {
  signupCredentials: SignupCredentials;
}