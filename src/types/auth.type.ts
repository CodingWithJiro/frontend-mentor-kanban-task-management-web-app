export interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user: AuthUser;
}
