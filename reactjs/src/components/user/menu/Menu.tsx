import React from "react";
import TopBar from "./TopBar";
import TopMenu from "./TopMenu";
import { CartProvider } from 'react-use-cart'

const Menu = () => {
    return <>
            <TopBar />
            <TopMenu />
    </>;
};

export default Menu;
