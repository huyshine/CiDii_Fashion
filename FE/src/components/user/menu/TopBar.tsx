import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdPermPhoneMsg, MdLogout } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { Typography } from 'antd';
import { isAuthenticate } from "../../../utils/authenticate";
import { useCart } from "react-use-cart";

const { Text } = Typography;

type TopBarProps = {
  onLogout: () => void;
};
const TopBar = ({ onLogout }: TopBarProps) => {
  // Effect scroll menu
  const [navbar, setNavbar] = useState(false);
  const pageScroll = () =>
    window.scrollY >= 28 ? setNavbar(true) : setNavbar(false);
  window.addEventListener("scroll", pageScroll);

  const navigate = useNavigate();
  const authenticate = isAuthenticate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
  };

  const {totalUniqueItems} = useCart();
  return (
    <>
      <div className={navbar ? "top-bar top-bar__bottom59" : "top-bar"}>
        <div className="top-bar__left">
          <ul>
            <li>
              <a href="tel:0982022969">
                <MdPermPhoneMsg />
                <span className="number-phone">
                  <b>0867.435.803</b>
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="top-bar__right">
          <ul>
            {!authenticate && (
              <li>
                <a href="/signin">
                  <FaUserCircle />
                  <span className="Account">Account</span>
                </a>
              </li>
            )}
            {authenticate && (
              <>
                {authenticate?.user.role === 1 && (
                  <li>
                    <a href="/admin">
                      <GrUserAdmin />
                      <span className="Account">
                        Admin | {authenticate.user.name}
                      </span>
                    </a>
                  </li>
                )}
                {authenticate?.user.role !== 1 && (
                  <li>
                    <a>
                      <FaUserCircle />
                      <span className="Account">
                        Hello, {authenticate.user.name}
                      </span>
                    </a>
                  </li>
                )}
                <li>
                  <a href="#" onClick={() => handleLogout()}>
                    <MdLogout />
                    <span className="Account">Đăng xuất</span>
                  </a>
                </li>
              </>
            )}
            <li>
              <a href="/cart">
                <RiShoppingBag3Fill />
                <span className="Cart">Cart <Text type="danger">({totalUniqueItems})</Text></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TopBar;
