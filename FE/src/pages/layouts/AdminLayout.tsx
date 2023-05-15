import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/admin/header/Header";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import "../../assets/css/dashboard.css"
type Props = {};

const AdminLayout = (props: Props) => {
    return <>
        <Sidebar />
        <Outlet/>
    </>;
};

export default AdminLayout;
