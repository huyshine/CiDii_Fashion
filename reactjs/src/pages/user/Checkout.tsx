import React from "react";
import { Badge } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { OrderType } from "../../types/order";
import { Currency } from "../../utils";
import { createOrder } from "../../api/order";
import { toast } from "react-toastify";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderType>();
  const { totalUniqueItems, items, totalItems, emptyCart, cartTotal } =
    useCart();
  const navigator = useNavigate();

  const onSubmit: SubmitHandler<OrderType> = async (info) => {
    try {
      await createOrder({
        userOrder: info.userOrder,
        listOrder: items,
        cartTotal: cartTotal,
        status: "0",
      });
      toast.success("Order Success, redirect after 3 seconds");
      localStorage.removeItem("react-use-cart");
      reset();
      setTimeout(() => navigator("/thankyou"), 3000);
    } catch (error) {
      toast.error("Error! Please try again later.");
    }
  };
  return (
    <div className="content">
      <div className="total-products">
        <h2 className="title-products">PAYMENT PAGE</h2>
        <div className="row">
          <div className="col-md-4 order-md-2">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">
                Cart <Badge count={totalUniqueItems} />
              </span>
            </h4>
            <ul className="list-group mb-3">
              {items.map((item, index) => {
                return (
                  <li
                    className="list-group-item d-flex justify-content-between lh-condensed"
                    key={index}
                  >
                    <div>
                      <h6 className="my-0">{item.name}</h6>
                    </div>
                    <span className="text-muted">
                      {Currency(item.price * item.quantity)}
                    </span>
                  </li>
                );
              })}
              <li className="list-group-item d-flex justify-content-between">
                <span>
                  <strong>Total money</strong>
                </span>
                <strong>{Currency(cartTotal)}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Receiver's information</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter your name"
                    {...register("userOrder.name")}
                    required={true}
                  />
                </div>
              </div>
              <div className="mb-2">
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Please enter your email (Optional)"
                    {...register("userOrder.email")}
                    required={true}
                  />
                </div>
              </div>
              <div className="mb-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter your number phone"
                    {...register("userOrder.phone")}
                    required={true}
                  />
                </div>
              </div>
              <div className="mb-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter your address"
                    {...register("userOrder.address")}
                    required={true}
                  />
                </div>
              </div>
              <hr className="mb-3" />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
