import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<HTMLInputElement>;
export type IFormEvent = FormEvent<HTMLFormElement>;

export interface IFacebookLoginPayload {
  accessToken: string;
  userID: string;
}
