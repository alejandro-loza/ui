export interface JWT {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  roles: string[];
  tokenType: string;
  username: string;
}
