import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { httpFile } from "../../config/axiosConfig";
import { toast } from "react-toastify";

const Addcount = () => {
const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    plan_desc: "",
    price: "",
    plan_duration: "",
 
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("user_id", adminInfo.user_id);
    formData.append("name", data.name);
    formData.append("plan_desc", data.plan_desc);
    formData.append("price", data.price);
    formData.append("plan_duration",data.plan_duration);


    try {
      const response = await httpFile.post("/add_plan", formData, {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedData = response.data.body;
      setData(updatedData);
      toast.success("SubScriptions Added Successfully");
      navigate("/subscription");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="section">
      <div className="section-body p-3" style={{ borderRadius: "10px" }}>
        <div className="row mt-sm-4">
          <div className="col-12 col-md-12 col-lg-12 mx-auto text-left">
            <div className="card p-md-3 shadow">
              <form onSubmit={handleSubmit}>
                <div className="section-header rounded py-4 shadow">
                  <h3 style={{ color: "black" }}> Add </h3>
                </div>

                <div className="card-body p-0">
                  <div className="row">
                    <div className="form-group col-md-6 col-12">
                      <label style={{ color: "black" }}>Name</label>
                      <input
                        type="text"
                        maxLength={30}
                        className="form-control"
                        value={data.name}
                        name="name"
                        onChange={handleChange}
                      />
                      <div className="m-0 error_text" style={{ color: "red" }}></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6 col-12">
                      <label style={{ color: "black" }}>Plan Description</label>
                      <input
                        type="text"
                        maxLength={30}
                        className="form-control"
                        value={data.plan_desc}
                        name="plan_desc"
                        onChange={handleChange}
                      />
                      <div className="m-0 error_text" style={{ color: "red" }}></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6 col-12">
                        <label style={{ color: "black" }}>Price</label>
                        <input
                        type="text"
                        maxLength={30}
                        className="form-control"
                        value={data.price}
                        name="price"
                        onChange={handleChange} />
                          <div className="m-0 error_text" style={{ color: "red" }}></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6 col-12">
                        <label style={{ color: "black" }}>Plan Duration</label>
                        <input
                        type="text"
                        maxLength={30}
                        className="form-control"
                        value={data.plan_duration}
                        name="plan_duration"
                        onChange={handleChange} />
                          <div className="m-0 error_text" style={{ color: "red" }}></div>
                    </div>
                  </div>
               
     

              

                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-icon icon-right"
                    >
                     Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Addcount;
