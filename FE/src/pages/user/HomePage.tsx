import React from "react";
import Slide from "../../components/user/slider/Slide";
import "../../assets/css/homePage.css"
import ProductList from "./products/ProductList";
const HomePage = () => {
    return <>
        <Slide />
        <div className="content">
            <ProductList />
        </div>
    </>;
};

export default HomePage;
