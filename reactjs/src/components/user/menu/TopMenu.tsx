import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listCategory } from "../../../api/category";
import { CategoryType } from "../../../types/category";

const TopMenu = () => {
  // Menu scrolling effect
  const [navbar, setNavbar] = useState(false);
  const pageScroll = () =>
    window.scrollY >= 28 ? setNavbar(true) : setNavbar(false);
  window.addEventListener("scroll", pageScroll);
  // List category on menu
  const [categories, setCategories] = useState<CategoryType[]>();
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await listCategory();
      setCategories(data.category);
    };
    getCategory();
  }, []);

  // console.log(categories);
  
  return (
    <>
      <div
        className={navbar ? "site-header affixed" : "site-header"}
        id="main-header"
      >
        <div className="logo">
          <a href="/">
            <img
              className="logo-4men"
              src="https://nguyenhuy.website/wp-content/uploads/2021/08/Nguyen-Huy-logo.png"
              alt="Logo CidiiShop"
              height="64px"
            />
          </a>
          
        </div>
        <nav className="nav">
          <ul className="menu" id="menu">
            <li>
              <a href="/" className="hover">
                home page
              </a>
            </li>
            {categories?.map(item => (
              <li key={item._id}>
                <Link to={`/category/${item._id}`}>{item.name}</Link>
              </li>
            ))}
            <li>
              <a href="/contact" className="hover">
                Contact us
              </a>
            </li>
          </ul>
        </nav>
        <div className="form-inline search">
          <input
            type="text"
            id="inputForm1"
            className="form-controlCus"
            placeholder="Search..."
            autoComplete="off"
          />
          <input type="submit" className="btnCus" />
        </div>
      </div>
    </>
  );
};

export default TopMenu;
