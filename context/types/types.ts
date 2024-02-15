import { Dispatch, SetStateAction } from "react";

import { RecaptchaVerifier } from "firebase/auth";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type getIsNewUserFromPhoneProps = {
  phone: string;
  recaptchaVerifier: RecaptchaVerifier;
};