import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  account: string;
  password: string;
  avatar: string;
  role: string;
  type: string;
  _doc: object;
}

export interface INewUser {
  name: string;
  account: string;
  password: string;
}

export interface IToken extends INewUser {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}
export interface IGgPayload {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
}
export type IUserParams = {
  name: string;
  account: string;
  password: string;
  avatar?: string;
  type: string;
};
