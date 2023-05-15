import { CategoryType } from "../types/category";
import { isAuthenticate } from "../utils/authenticate";
import instance from "./instance";

export const listCategory = () => {
  const url = `/category`;
  return instance.get(url);
};
export const readCategory = (id: string) => {
  const url = `/category/get/${id}`;
  return instance.get(url);
};
export const listProductbyCategory = (id: string) => {
  const url = `/category/${id}`;
  return instance.get(url);
};
export const createCategory = (
  category: CategoryType,
  { token, user } = isAuthenticate()
) => {
  const url = `/category/${user._id}`;
  return instance.post(url, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateCategory = (
  category: CategoryType,
  { token, user } = isAuthenticate()
) => {
  const url = `/category/${category._id}/${user._id}`;
  return instance.put(url, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const removeCategory = (
  id: string,
  { token, user } = isAuthenticate()
) => {
  const url = `/category/${id}/${user._id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
