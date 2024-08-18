export interface IToken {
    access_Token: string;
    refresh_Token: string;
  }
  
  export interface ILogin {
    username: string;
    password: string;
}
  export interface ApiErrorResponse {
    Message: string;
    Error_description: string;
  }