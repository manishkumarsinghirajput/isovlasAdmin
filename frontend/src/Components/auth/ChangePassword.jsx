import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { http } from "../../../config/axiosConfig";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    _id: '6604f9a378f6dfeb126775fe' // Assuming this is the admin user ID
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New Passwords and Confirm Password do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await http.post(`/api/v1/admin/adminPassword`, passwordData);
      if (response.data.statusCode === 200) { // Check if the response message is true
        toast.success("Password changed successfully"); // Show success message
        navigate("/"); // Redirect to homepage
        // Clear password fields after successful change
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
          _id: '6604f9a378f6dfeb126775fe' // Assuming this is the admin user ID
        });
      } else {
        toast.error(response.data.message); // Show error message from backend
        if (response.data.message === "Old Password is incorrect") {
          setPasswordData((prevData) => ({
            ...prevData,
            oldPassword: "",
          }));
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Old Password is incorrect"); // Show generic error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section">
        <div className="section-header rounded py-4 shadow" style={{ marginTop: "-48px", padding: "17px" }}>
          <h1>Change Password</h1>
        </div>
        <div className="section-body">
          <div className="card mb-0 py-4 bg-transparent shadow-none">
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="about-text go-to shadow p-3 rounded h-100 text-left card">
                      <h5 className="dark-color mb-4 p-md-0">Change Password</h5>
                      <div className="about-list">
                        <div className="media pro_file_Set border-0">
                          <label htmlFor="oldPassword" style={{ color: "black" }}>Current Password:</label>
                          <input
                            id="oldPassword"
                            type="password"
                            className="form-control pwstrength"
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="media pro_file_Set border-0">
                          <label htmlFor="newPassword" style={{ color: "black", paddingRight: '15px' }}>New Password:</label>
                          <input
                            id="newPassword"
                            type="password"
                            className="form-control pwstrength"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="media pro_file_Set border-0">
                          <label htmlFor="confirmPassword" style={{ color: "black" }}>Confirm Password:</label>
                          <input
                            id="confirmPassword"
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <button className="btn btn-outline-primary mx-auto" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Save'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
