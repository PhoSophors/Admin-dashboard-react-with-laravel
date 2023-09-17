"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmLeft, HiChartPie, HiInbox, HiShoppingBag, HiUser,
} from "react-icons/hi";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

export default function MultiLevelDropdown() {

    //  logout ==============================================
    const { token, setToken, setUser } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }
    const onLogout = (ev) => {
        ev.preventDefault();
        console.log(onLogout);
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);
    // end logout  ==============================================

    return (
        <Sidebar className=""  aria-label="Sidebar shadow-3xl with multi-level  dropdown example">
            <Sidebar.Items>
                <Sidebar.ItemGroup >
                    <Sidebar.Item href="dashboard" icon={HiChartPie}>
                        <p>Dashboard</p>
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                        <Sidebar.Item href="#">Products</Sidebar.Item>
                        <Sidebar.Item href="#">Sales</Sidebar.Item>
                        <Sidebar.Item href="#">Refunds</Sidebar.Item>
                        <Sidebar.Item href="#">Shipping</Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Item href="#" icon={HiInbox}>
                        <p>Inbox</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="users" icon={HiUser}>
                        <p>Users</p>
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiShoppingBag}>
                        <p>Products</p>
                    </Sidebar.Item>
                    <Sidebar.Item onClick={onLogout} href="#" icon={HiArrowSmLeft}>
                        <p>Logout</p>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
