export interface AdminSession {
  authenticated: boolean;
}

export interface AdminLoginPayload {
  password: string;
}
