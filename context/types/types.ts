import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type getIsNewUserFromPhoneProps = {
  phone: string;
  recaptchaVerifier: any;
};