import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/user/footer/Footer";
import Header from "../../components/user/header/Header";

const WebsiteLayout = () => {
    return <>
        <header className="header">
            <Header/>
        </header>
        <main>
            <Outlet />
        </main>
        <footer className="footer">
            <Footer />
        </footer>
    </>;
};

export default WebsiteLayout;
