import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Currency } from "../../utils";
import { BsChevronRight, BsChevronLeft, BsCartXFill } from "react-icons/bs";
import { ImTruck } from "react-icons/im";

const Cart = () => {
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    totalItems,
  } = useCart();
  if (isEmpty)
    return (
      <h1 style={{ textAlign: "center", margin: 150 }}><BsCartXFill style={{margin: "-14px 9px  0 0"}}/>Your cart is empty</h1>
    );
  console.log(items);
  return (
    <div className="content">
      <div className="total-products">
        <h2 className="title-products">YOUR CART</h2>
        <section className="section-content">
          <div className="container">
            <div className="row">
              <main className="col-md-8">
                <div className="card">
                  <table className="table table-borderless table-shopping-cart text-center">
                    <thead className="text-muted">
                      <tr className="small text-uppercase">
                        <th scope="col">Product Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col" className="text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <p>
                                <strong>{item.name}</strong>
                              </p>
                            </td>
                            <td>
                              <img className="rounded" src={item.image} style={{ width: "6rem" }} />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity - 1)
                                }
                              >
                                -
                              </button>
                              <span style={{ padding: "30px" }}>
                                <strong>{item.quantity}</strong>
                              </span>
                              <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <em>{Currency(item.price * item.quantity)}</em>
                            </td>
                            <td className="text-right">
                              <button
                                className="btn btn-outline-dark"
                                onClick={() => removeItem(item.id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="card-body border-top">
                    <Link to="/" className="btn btn-light float-start">
                      <BsChevronLeft /> Back to home
                    </Link>
                    <Link to="/checkout" className="btn btn-dark float-end">
                      Cash payment <BsChevronRight />
                    </Link>
                  </div>
                </div>
                <div className="alert alert-success mt-3">
                  <ImTruck style={{ margin: "-6px 5px 0 0" }} />
                  <span className="icontext">Delivery from 3 to 6 days</span>
                </div>
              </main>
              <aside className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <div className="summary" style={{ textAlign: "center" }}>
                      <h3>
                        <strong>ORDER SUMMARY</strong>
                      </h3>
                    </div>
                    <p>
                      Gross product:
                      <span style={{ marginLeft: 30 }}>{totalItems}</span>
                    </p>
                    <p>
                      Transport fee: <span style={{ marginLeft: 30 }}>$ 0</span>
                    </p>
                    <p>
                      Total amount:{" "}
                      <span style={{ marginLeft: 30 }}>
                        <strong>{Currency(cartTotal)}</strong>
                      </span>
                    </p>
                    <div
                      className="border border-danger"
                      style={{ padding: 7, textAlign: "justify" }}
                    >
                      <p style={{margin : 0}}>
                        CiDii will confirm the order by phone call. Please pay
                        attention to your phone when your order is successful
                        and wait for delivery. Thank you !
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
