export interface UserTokenPayload {
  sub: string;
  preferred_username: string;
  superuser: boolean;
  administrator: boolean;
  aud: string;
  exp: number;
}

export interface GetJWTTokenParams {
    username: string;
    password: string;
    superuser?: boolean;
}