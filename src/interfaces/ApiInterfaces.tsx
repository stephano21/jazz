export interface IToken {
    access_Token: string;
    refresh_Token: string;
  }
  //ApirError
  
  export interface ApiErrorResponse {
    Message: string;
    Error_description: string;
  }