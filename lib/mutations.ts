import { SignupFormValue } from "../types/signup-form-value";
import fetcher from "./fetcher";

export const auth = (mode: "signin" | "signup", body: SignupFormValue) => {
  return fetcher(`/${mode}`, body);
};
