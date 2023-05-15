import { OrderType } from "../types/order";
import instance from "./instance";

export const listOrder = () => {
  const url = `/order`;
  return instance.get(url);
};
export const readOrder = (id: string) => {
  const url = `/order/${id}`;
  return instance.get(url);
};
export const createOrder = (order: OrderType) => {
  const url = `/order`;
  return instance.post(url, order);
};
export const updateOrder = (order: OrderType) => {
  const url = `/order/${order._id}`;
  return instance.put(url, order);
};
export const removeOrder = (id: string) => {
  const url = `/order/${id}`;
  return instance.delete(url);
};
