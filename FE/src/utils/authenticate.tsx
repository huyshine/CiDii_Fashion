import { CartType } from "../types/cart";

export const isAuthenticate = () => {
  if (!localStorage.getItem("user")) return;
  return JSON.parse(localStorage.getItem("user") as string);
};
// const getCart = () => {
//   return JSON.parse(localStorage.getItem("cart") as string) || [];
// };
// export const addTocart = (
//   newProduct: CartType,
//   next: () => void,
//   cart = getCart()
// ) => {
//   const existProduct = cart.find(
//     (item: { id: string }) => item.id === newProduct.id
//   );
//   if (existProduct) {
//     existProduct.quantity += newProduct.quantity;
//   } else {
//     cart.push(newProduct);
//   }
//   localStorage.setItem("cart", JSON.stringify(cart));
//   next();
// };
