import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { http } from "../../../config/axiosConfig";

const EditAdminDetail = () => {
  const [data, setData] = useState({
    _id: "",
    name: "",
    email: "",
    mobileNumber: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await http.post("/api/v1/admin/adminprofile", { _id: '6604f9a378f6dfeb126775fe' }); // Assuming this is the ID you want to use for fetching the profile
      const userData = res.data.data.body;
      setData(userData);
    } catch (err) {
      handleFetchError(err);
    }
  };

  const handleFetchError = (err) => {
    const errorMessage = err.response ? err.response.data.message : "Failed to fetch admin profile";
    if (errorMessage === "Please Login First") {
      localStorage.clear();
      navigate("/");
    } else {
      toast.error(errorMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...data, _id: '6604f9a378f6dfeb126775fe' }; // Assuming this is the ID you want to use for updating
      await http.post("/api/v1/admin/admin_edit_profile", updatedData);
      toast.success("Admin Information Updated");
      navigate("/editadminDetail");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : "Failed to update admin information";
      toast.error(errorMessage);
    }
  };
  

  return (
    <>
      <section className="section">
        <div className="section-header rounded py-4 shadow" style={{ marginTop: "-48px", padding: "17px" }}>
          <h1>Edit Detail</h1>
        </div>

        <div className="section-body p-3 " style={{ borderRadius: "10px" }}>
          <div className="row mt-sm-4 ">
            <div className="col-12 col-md-12 col-lg-12 mx-auto text-left ">
              <div className="card p-md-3 shadow">
                <form onSubmit={handleSubmit}>
                  <div className="card-body p-0">
                    <div className="row">
                      <div className="form-group col-md-12 col-12">
                        <label>Name</label>
                        <input
                          type="text"
                          maxLength={30}
                          className="form-control"
                          value={data.name}
                          name="name"
                          required
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-12 col-12">
                        <label>Email</label>
                        <input
                          type="email"
                          disabled
                          maxLength={25}
                          className="form-control"
                          name="email"
                          value={data.email}
                          required
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-12 col-12">
                        <label>Mobile</label>
                        <input
                          type="text"
                          name="mobileNumber"
                          id="mobileNumber"
                          className="form-control"
                          value={data.mobileNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-12 my-3 col-12 d-flex">
                        <div className="card-footer p-0 me-2 text-left">
                          <button className="btn btn-primary" type="submit">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditAdminDetail;
