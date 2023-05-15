import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsCartCheckFill } from "react-icons/bs";
import { Image, Table } from "antd";
import { ProductType } from "../../types/product";
import { NavLink, useParams } from "react-router-dom";
import { listProductbyCategory } from "../../api/category";
import { Currency } from "../../utils";
import { CategoryType } from "../../types/category";

const ProductByCategory = () => {
  const [products, setProducts] = useState<ProductType[]>();
  const [category, setCategory] = useState<CategoryType>();

  const { id } = useParams();
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await listProductbyCategory(id as string);
      setProducts(data.product);
    };
    getProducts();
  }, [id]);
  // Title category
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await listProductbyCategory(id as string);
      setCategory(data.category);
    };
    getCategory();
  }, [id]);
  return (
    <div className="content">
      <div className="total-products">
        <h2 className="title-products">{category?.name}</h2>
        {/* Nodata */}
        {products?.length == 0 && <Table />} 
        <div className="products">
          {products &&
            products.map((item) => {
              return (
                <div className="item-product" key={item._id}>
                  <a>
                    <Image src={item.image} alt={item.name} />
                  </a>
                  <h3 className="name-product">
                    <a href="#">{item.name}</a>
                  </h3>
                  <span className="price">{Currency(item.price)}</span>
                  <div className="btn__item-product">
                    <a href="#">
                      <BsCartCheckFill /> Quick purchase
                    </a>
                    <NavLink
                      to={"/detail/" + item._id}
                      style={{ borderLeft: "1px #fff solid" }}
                    >
                      <BsFillEyeFill /> See details
                    </NavLink>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
