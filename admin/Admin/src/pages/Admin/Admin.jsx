import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import {Routes,Route} from "react-router-dom";
import Add_Product from "../AddProduct/Add_Product";
import './Admin.css';
import List_Product from "../ListProduct/List_Product";
import AllOrders from "../Orders/AllOrders.jsx";
import { Chat } from "../../components/Chat/Chat";
// import all from "../Orders/allOrders";

export default function Admin(){
    return(
        <div className="admin">
            <Sidebar />
            <Routes>
                <Route path="/addProduct" element={<Add_Product />} />
                <Route path="/listProduct" element={<List_Product />} />
                <Route path="/Orders" element={<AllOrders />} />
                <Route path="/Chat" element={<Chat />} />
            </Routes>
        </div>

    );
}