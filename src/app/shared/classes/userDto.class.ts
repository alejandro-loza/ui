export class User {
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
  id?: string;

  constructor(
    email: string,
    password: string,
    accessToken?: string,
    refreshToken?: string,
    id?: string
    ) {
      this.email = email;
      this.password = password;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.id = id;
  }

  /* Access Token */
  public set setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
  public get getAccessToken(): string {
    return this.accessToken;
  }

  /* Refresh Token */
  public set setRefreshToken( refreshToken: string) {
    this.refreshToken = refreshToken;
  }
  public get getRefreshToken(): string {
    return this.refreshToken;
  }

  /* id User */
  public set setId(id: string) {
    this.id = id;
  }
  public get getId(): string {
    return this.id;
  }
  
}
