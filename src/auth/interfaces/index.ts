export interface RegistrationStatus {
  success: boolean;
  message: string;
}

export interface LoginStatus {
  username: string;
  accessToken: any;
  expiresIn: any;
}

export interface JwtPayload {
  username: string;
}
