import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<HTMLInputElement>;
export type IFormEvent = FormEvent<HTMLFormElement>;

export interface IFacebookLoginPayload {
  accessToken: string;
  userID: string;
}

export interface IUserInfo {
  name: string;
  account: string;
  password: string;
  cfPassword: string;
  avatar: string | File;
}

export interface ICategory {
  createdAt?: string;
  name: string;
  updatedAt?: string;
  __v?: number;
  _id: string;
}
