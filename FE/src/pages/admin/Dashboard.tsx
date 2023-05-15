import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import {
  BsFillCartCheckFill,
  BsFillCartPlusFill,
  BsFillCartFill,
} from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import Header from "../../components/admin/header/Header";

const Dashboard = () => {
  return (
    <section className="home-section">
      <Header />
      <div className="home-content">
        <div className="overview-boxes">
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Order</div>
              <div className="number">99,999+</div>
              <div className="indicator">
                <i className="bx bx-up-arrow-alt">
                  <AiOutlineArrowDown />
                </i>
                <span className="text">Up from yesterday</span>
              </div>
            </div>
            <i className="bx bx-cart-alt cart">
              <BsFillCartCheckFill />
            </i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Sales</div>
              <div className="number">20,000</div>
              <div className="indicator">
                <i className="bx bx-up-arrow-alt">
                  <AiOutlineArrowDown />
                </i>
                <span className="text">Up from yesterday</span>
              </div>
            </div>
            <i className="bx bxs-cart-add cart two">
              <BsFillCartPlusFill />
            </i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Profit</div>
              <div className="number">$92,901</div>
              <div className="indicator">
                <i className="bx bx-up-arrow-alt">
                  <AiOutlineArrowDown />
                </i>
                <span className="text">Up from yesterday</span>
              </div>
            </div>
            <i className="bx bx-cart cart three">
              <BsFillCartFill />
            </i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Return</div>
              <div className="number">11,086</div>
              <div className="indicator">
                <i className="bx bx-down-arrow-alt down">
                  <AiOutlineArrowUp />
                </i>
                <span className="text">Down From Today</span>
              </div>
            </div>
            <i className="bx bxs-cart-download cart four">
              <FaCartArrowDown />
            </i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
