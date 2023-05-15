import instance from "./instance";
import { ProductType } from "../types/product";
import { isAuthenticate } from "../utils/authenticate";

export const getAll = () => {
  const url = `/products`;
  return instance.get(url);
};

export const get = (id: string) => {
  const url = `/products/${id}`;
  return instance.get(url);
};
export const add = (
  product: ProductType,
  { token, user } = isAuthenticate()
) => {
  const url = `/products/${user._id}`;
  return instance.post(url, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const update = (
  product: ProductType,
  { token, user } = isAuthenticate()
) => {
  const url = `/products/${product._id}/${user._id}`;
  return instance.put(url, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const remove = (id: string, { token, user } = isAuthenticate()) => {
  const url = `/products/${id}/${user._id}`;
  return instance.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
