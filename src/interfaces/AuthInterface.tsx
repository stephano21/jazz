import { IToken } from "./ApiInterfaces";

export interface IRegister {
    Username: string;
    password: string;
    Email: string;
    FirstName: string;
    LastName: string;
}
export interface IUser {
    Username: string;
    auth: IToken;
    Role: string;
    Env: string;
}
export interface ILocation {
    latitude: number;
    longitude: number;
}

export interface IUserProfile {
    firstName: string;
    lastName: string;
    nickName?: string;
}

export interface IUserRegister {
    userName: string;
    email: string;
    role?: string;
    porfile: IUserProfile;
    password: string;
}