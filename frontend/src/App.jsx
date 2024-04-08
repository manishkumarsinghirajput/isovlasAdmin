import React, { useEffect } from "react";
import { Form, Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


import { ToastContainer } from 'react-toastify';
import AdminLayout from "./Components/auth/adminLayout/AdminLayout";

import Login from "./Components/Login";
import { Dashboard } from "./Components/Dashboard";
import EditAdminDetail from "./Components/auth/EditAdminDetail";
import Account from "./Components/Account";
import Addcount from "./Components/Addcount";
import UserList from "./Components/UserList";
import OurProduct from "./Components/OurProduct";
import Banner from "./Components/Banner";
import AddProduct from "./Components/Addproduct";
import AddBanner from "./Components/AddBanner";
import Document from "./Components/Document";
import DocumentAdd from "./Components/DocumentAdd";
import Queries  from "./Components/Queries"
import ChangePassword from "./Components/auth/ChangePassword";
import UserView from "./Components/UserView";
import DocumentView from "./Components/DocumentView";
import DocumentUpdate from "./Components/DocumentUpdate";
import ProductView from "./Components/ProductView";
import ProductUpdate from "./Components/ProductUpdate";

import BannerView from "./Components/BannerView";

import QueriesView from "./Components/QueriesView";
import ContactUs from "./Components/ContactUs";

import ContactUsView from "./Components/ContactUsView";

function App() {
    // const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!adminInfo) {
    //         // If the token does not exist, redirect the user to the login page
    //         navigate('/');
    //     }
    // }, [adminInfo, navigate]);

    return (
        <>
            <Routes>
           
                <Route index element={<Login />} />
            
                <Route path="/" element={<AdminLayout />}>
               
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/userlist" element={<UserList/>} />
               
                <Route path="/editAdmindetail" element={<EditAdminDetail />} />

                <Route path="/account" element={<Account/>} />

                <Route path="/addcount" element={<Addcount/>} />

                <Route path="/ourproduct" element={<OurProduct/>} />

                <Route path="/addproduct" element={<AddProduct/>} />
 
                <Route path="/banner" element={<Banner/>} />

                <Route path="/addbanner" element={<AddBanner/>} />
                  
                  <Route path="/document" element={<Document/>} />

                  <Route path="/documentadd" element={<DocumentAdd/>} />

                  <Route path="/queries" element={<Queries/>} />

                  <Route path="/changepassword" element={<ChangePassword/>} />

                  <Route path="/userview/:_id" element={<UserView/>} />

                  <Route path="/documentview/:_id" element={<DocumentView/>} />

                  <Route path="/documentupdate/:_id" element={<DocumentUpdate/>} />

                  <Route path="/productview/:_id" element={<ProductView/>} />

                  <Route path="/productupdate/:_id" element={<ProductUpdate/>} />

                  <Route path="/bannerview/:_id" element={<BannerView/>} />

                  <Route path="/queriesview/:_id" element={<QueriesView/>} />

                  <Route path="/contactus" element={<ContactUs/>} />

                  <Route path="/contactusview/:_id" element={<ContactUsView/>} />

                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
