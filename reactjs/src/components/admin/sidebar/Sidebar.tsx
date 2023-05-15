import React from "react";
import {
  MdOutlineDashboard,
  MdOutlineCategory,
  MdOutlineFeedback,
  MdOutlineSettings,
} from "react-icons/md";
import { BsBackspaceReverse } from "react-icons/bs";
import { BiBasket, BiBook } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="sidebar">
      <div className="logo-details">
        <div className="logo_name">
          <h1>ADMIN</h1>
        </div>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/admin/dashboard" className="active">
            <i>
              <MdOutlineDashboard />
            </i>
            <span className="links_name">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/admin/category">
            <i>
              <MdOutlineCategory />
            </i>
            <span className="links_name">Categories</span>
          </a>
        </li>
        <li>
          <a href="/admin/products">
            <i>
              <BiBasket />
            </i>
            <span className="links_name">Products</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i>
              <HiOutlineUserGroup />
            </i>
            <span className="links_name">Users</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i>
              <MdOutlineFeedback />
            </i>
            <span className="links_name">Feedbacks</span>
          </a>
        </li>
        <li>
          <a href="/admin/order">
            <i>
              <BiBook />
            </i>
            <span className="links_name">Total order</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i>
              <MdOutlineSettings />
            </i>
            <span className="links_name">Setting</span>
          </a>
        </li>
        <div className="Logout">
          <li className="log_out">
            <a href="/">
              <i>
                <BsBackspaceReverse />
              </i>
              <span className="links_name">Back to Home</span>
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
