import React, { useEffect, useState } from "react";
import { http } from '../../../config/axiosConfig';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


function Navbar() {
    const navigate = useNavigate();
    const [data, setData] = useState({
      _id:''
    });
    const [logout, setLogout] = useState();

    const adminInfo = JSON.parse(localStorage.getItem('adminProfile'));
    const getProfile = async () => {
      try {
        const res = await http.post("/api/v1/admin/adminprofile", { _id: '6604f9a378f6dfeb126775fe' }); // Assuming this is the ID you want to use for fetching the profile
        const userData = res.data.data.body;
        setData(userData);
      } catch (err) {
        handleFetchError(err);
      }
    };
   
      useEffect(() => {
        getProfile();
      }, []);
  
  // Frontend code
  const logoutHandler = () => {
    Swal.fire({
      title: "Are You Sure Want To Logout",
      text: "You Won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear authentication data from localStorage
        localStorage.removeItem('adminProfile');
        toast.success("Logout Successfully");
        // Redirect to the login page or any other appropriate page
        navigate("/");
      }
    });
  };
  

    

    return (
        <>
            <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar">
                <form className="form-inline mr-auto">
                    <ul className="navbar-nav mr-3" style={{ marginBottom: "36px" }}>
                        <li style={{ cursor: "pointer" }}>
                            <Link
                                style={{ color: "white" }}
                                to="#"
                                data-toggle="sidebar"
                                className="nav-link nav-link-lg ps-0"
                              
                            >
                                <i className="fas fa-bars"></i>
                            </Link>
                        </li>
                    </ul>
                </form>
                <ul
                    className="navbar-nav navbar-right"
                    style={{ marginBottom: "36px" }}
                >
                    <li className="dropdown">
                    <Link
              href="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg nav-link-user"
            >
              <div className="d-sm-none d-lg-inline-block">Hi, admin</div>
      
              {/* {adminProfile && (
                // <div className="d-sm-none d-lg-inline-block">Hi, admin</div>
              )} */}
            </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                            {/* <div className="dropdown-title">Logged in 5 min ago</div> */}
                            <Link to="/editadmindetail" className="dropdown-item has-icon">
                                <i className="far fa-user"></i> Profile
                            </Link>
                            <Link to="/ChangePassword" className="dropdown-item has-icon">
                <i className="fas fa-bolt"></i> Change Password
              </Link>
                            {/* <Link to="#" className="dropdown-item has-icon">
                <i className="fas fa-cog"></i> Settings
              </Link> */}
                            <div className="dropdown-divider"></div>
              <Link
                to=""
                onClick={logoutHandler}
                className="dropdown-item has-icon text-danger"
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;