import React, { useEffect, useState } from "react";
import { Link,useLocation,useNavigate} from "react-router-dom";
import { httpFile } from "../../../config/axiosConfig";
function Sidebar() {

const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));

const [data, setData] = useState([]);
const [cmsDropdown, setCmsDropdown] = useState(false);
const [ContactDropdown, setContactDropdown] = useState(false);
const location = useLocation();
const path = location.pathname;
// const getuser = () => {
//   httpFile
//     .get(`/userlist`, {
//       headers: {
//         Authorization: `Bearer ${adminInfo?.token}`,
//       },
//     })
//     .then((res) => {
//       setData(res.data.body);
//     })
//     .catch((err) => {
//       var error = err.response.data.message;
//       if (error === "Please Login First") {
//         localStorage.clear();
       
//         toast.error("Please Login First");
//       }
//       console.error(err.message);
//     });
// };

// useEffect(() => {
//   getuser();
// }, []);

const sidebarHideShow = () => {
  if (document.body.classList.contains("sidebar-show")) {
    document.body.classList.add("sidebar-gone");
    document.body.classList.remove("sidebar-mini");
    document.body.classList.remove("sidebar-show");
  }
};

useEffect(() => {
  sidebarHideShow();
}, []);

  return (
    <div>
      <div className="main-sidebar sidebar-style-2 shadow">
        <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
        <Link to="/dashboard">
  <h4 style={{ marginTop: "20px" }}>ISOVLAS</h4>
</Link>

</div>
<div className="sidebar-brand sidebar-brand-sm">
  <Link to="/dashboard">
    <h4>ISOVLAS</h4>
  </Link>
</div>

          <ul className="sidebar-menu">
            <li className="menu-header"></li>
            <li
             className={`nav-item ${path === "/dashboard" ? "active" : ""}`}
             onClick={() => {}}
           >
              <Link to={"/dashboard"} className="nav-link ">
                <i className="fas fa-fire"></i>
                <span>DASHBOARD</span>
              </Link>
            </li>
          
        
  
         
    <li
      className={`nav-item ${path === "/userlist" ? "active" : ""}`}
      onClick={() => {}}
    >
      <Link to="/userlist" className="nav-link">
        <i className="fas fa-users"></i>
        <span>USERLIST</span>
      </Link>
    </li>

    <li
      className={`nav-item ${path === "/document" ? "active" : ""}`}
      onClick={() => {}}
    >
      <Link to="/document" className="nav-link">
        <i className="fas fa-users"></i>
        <span>DOCUMENT</span>
      </Link>
    </li>
    <li
      className={`nav-item ${path === "/ourproduct" ? "active" : ""}`}
      onClick={() => {}}
    >
      <Link to="/ourproduct" className="nav-link">
        <i className="fas fa-users"></i>
        <span>OURPRODUCT</span>
      </Link>
    </li>
    <li
      className={`nav-item ${path === "/banner" ? "active" : ""}`}
      onClick={() => {}}
    >
      <Link to="/banner" className="nav-link">
        <i className="fas fa-users"></i>
        <span>BANNER</span>
      </Link>
    </li>
    <li
      className={`nav-item ${path === "/queries" ? "active" : ""}`}
      onClick={() => {}}
    >
      <Link to="/queries" className="nav-link">
        <i className="fas fa-users"></i>
        <span>QUERIES</span>
      </Link>
    </li>

   
    <li
      className={`nav-item ${path === "/contactus" ? "active" : ""}`}
      onClick={() => {}}
    >
      <Link to="/contactus" className="nav-link">
        <i className="fas fa-users"></i>
        <span>CONTACTUS</span>
      </Link>
    </li>
  
             </ul>

             
        </aside>
      </div>
    </div>
  );
}

export default Sidebar;