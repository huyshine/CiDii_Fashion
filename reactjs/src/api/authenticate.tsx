import { UserType } from "../types/user";
import instance from "./instance";

export const signup = async (user: UserType) => {
  const url = `/signup`;
  return instance.post(url, user);
};
export const signin = (user: { email: string; password: string }) => {
  const url = `/signin`;
  return instance.post(url, user);
};
