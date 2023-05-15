import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../api/product";
import { Image } from "antd";
import { ProductType } from "../../../types/product";
import "../../../assets/css/detail.css";
import { Currency } from "../../../utils";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai"
import { useCart } from "react-use-cart";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart()
  const [product, setProduct] = useState<ProductType>();
  useEffect(() => {
    const getDetail = async () => {
      const { data } = await get(id as string);
      setProduct(data);
    };
    getDetail();
  }, []);
  console.log(product)
  const itemCart = {
    id,
    productId: product?._id,
    name: product?.name,
    price: product?.price,
    image: product?.image
  }
  return (
    <div className="detail__content" key={product?._id}>
      <div className="content__left">
        <div className="img">
          <Image src={product?.image} />
        </div>
      </div>
      <div className="content__right">
        <div className="info">
          <h1>{product?.name}</h1>
          <div>
            <span>Stocking</span>
          </div>
        </div>
        <div className="price">
          <p>{product?.price}$</p>
        </div>
        <div className="color">
          <p>Color (<em>Incomplete</em>)</p>
          <button>
            <img src={product?.image} />
          </button>
        </div>
        <div className="size">
          <p>Size (<em>Incomplete</em>)</p>
          <span>M</span>
          <span>X</span>
          <span>XL</span>
        </div>
        {/* <div className="quantity">
          <p>Quatity</p>
          <i><AiOutlineMinus/></i>
          <input type="number" min={1} defaultValue={1} />
          <i><AiOutlinePlus/></i>
        </div> */}
        <div className="mb-4">
          <button className="btn btn-dark mr-1" onClick={() => addItem(itemCart)}>ADD TO CART</button>
        </div>
        <div className="desc">
          <p style={{fontWeight: "bold"}}>Description</p>
          <span><em>{product?.description}</em></span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
