import React, { useEffect, useState } from "react";
import { getAll } from "../../../api/product";
import { Card, Image, List } from "antd";
import { ProductType } from "../../../types/product";
import { Currency } from "../../../utils";
import { BsFillEyeFill, BsCartCheckFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "react-use-cart";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { addItem } = useCart();
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await getAll();
      setProducts(data);
    };
    getProducts();
  }, []);
  const listData = products?.map((item, index) => {
    return {
      key: index + 1,
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
    };
  });
  return (
    <div className="total-products">
      <h2 className="title-products">ALL PRODUCTS</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item style={{ textAlign: "center", marginBottom: 77 }}>
            <Card title={<Image src={item.image} />}>
              <Link to={`/products/${item.id}`} style={{textDecoration: "none", color: "black"}}>
                <h5 className="name-product">{item.name}</h5>
              </Link>
              <h6>{Currency(item.price)}</h6>
              <div className="btn__item-product" key={item.id}>
                <button className="btnBuy" onClick={() => addItem(item)}>
                  <BsCartCheckFill /> Quick purchase
                </button>
                <NavLink
                  to={"/detail/" + item.id}
                  style={{ borderLeft: "1px #fff solid" }}
                >
                  <BsFillEyeFill /> See details
                </NavLink>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductList;
