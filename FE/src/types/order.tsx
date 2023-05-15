export type OrderType = {
  _id?: string;
  userOrder: {
    name?: string;
    phone?: string;
    address?: string;
    email?: string;
  };
  listOrder?: [
  {
    key?: number;
    id?: string;
    image?: string;
    itemTotal?: number;
    price?: number;
    quatity?: number;
    name?: string;
  }
  ];
  cartTotal: number;
  status: string;
};
