import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../config/axiosConfig";
import { toast } from "react-toastify";
import "./login.css";
const Login = () => {
  const navigate = useNavigate();
  const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));
  const [data, setData] = useState({ email: "", pwd: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = () => {
    http
      .post("/api/v1/admin/login", data)
      .then((res) => {
        const responseData = res.data;
        if (responseData.status === "success") {
          const { token, ...userData } = responseData.data;
          localStorage.setItem("adminProfile", JSON.stringify(userData));
          navigate("/dashboard");
          toast.success(responseData.message);
        } else {
          setError(responseData.message);
        }
      })
      .catch((err) => {
        var errorMessage = err.response?.data?.message;
        if (errorMessage === "Please Login First") {
          localStorage.clear();
          navigate("/");
        }
        setError(errorMessage);
      });
  };

  useEffect(() => {
    if (adminInfo) {
      navigate("/dashboard");
    }
  }, [adminInfo, navigate]);

  return (
    <>
      <section className="section bg-image">
      <div className="d-flex flex-wrap align-items-stretch justify-content-center mt-5"> {/* Added mt-5 class for margin top */}
      <div className="col-lg-4 col-md-6 col-12 min-vh-100 order-2  mx-auto">
        <div className="p-4 m-3">

              <div className="text-center"></div>
              <div className="user_form">
                <div className="form-group">
                  <label className="mt-0" htmlFor="email">
                    Email
                  </label>
                  <div className="form_group">
                    <i className="fa-solid fa-user"></i>
                    <input
                      id="email"
                      type="email"
                      className={`form-control ${!data.email && "is-invalid"}`}
                      name="email"
                      value={data?.email}
                      onChange={handleChange}
                      tabIndex="1"
                      required=""
                      autoFocus=""
                    />
                    {!data.email && <div className="invalid-feedback">Please fill in your email</div>}
                  </div>
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                  <div className="d-block">
                    <label htmlFor="password" className="mt-0">
                      Password
                    </label>
                  </div>
                  <div className="form_group">
                    <i className="fa-solid fa-lock"></i>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${!data.pwd && "is-invalid"}`}
                      name="pwd"
                      value={data?.pwd}
                      onChange={handleChange}
                      tabIndex="2"
                      required=""
                    />
                    {!data.pwd && <div className="invalid-feedback">Please fill in your password</div>}
                  </div>
                </div>
                <div className="form-group text-right">
                  <button
                    onClick={login}
                    type="submit"
                    className="btn btn-primary btn-lg btn-icon icon-right w-100"
                    tabIndex="4"
                  >
                    Login
                  </button>
                </div>
                {error && <div className="text-danger mt-3">{error}</div>}
              </div>
              <div className="text-center mt-5 text-small">Copyright © Demo. Made with by Social</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
