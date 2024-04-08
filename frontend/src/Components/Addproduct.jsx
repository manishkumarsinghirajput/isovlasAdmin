import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../config/axiosConfig";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    image: null, // Changed to single image instead of images array
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setData({
      ...data,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("image", data.image); // Corrected image field name

      const response = await http.post("/api/v1/admin/ourproduct/add", formData);

      setData({
        name: "",
        description: "",
        price: "",
        image: null,
      });

      toast.success("Product Added Successfully");
      navigate("/ourproduct");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Failed to add product. Please try again.";
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
                  <h3 style={{ color: "black" }}>Add Product</h3>
                </div>

                <div className="card-body p-0">
                <div className="row">
                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Name</label>
                      <input
                        type="text"
                        maxLength={30}
                        className="form-control"
                        value={data.name}
                        name="name"
                        onChange={handleChange} />
                      <div className="m-0 error_text" style={{ color: "red" }}></div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Description</label>
                      <input
                        type="text"
                        maxLength={30}
                        className="form-control"
                        value={data.description}
                        name="description"
                        onChange={handleChange} />
                      <div className="m-0 error_text" style={{ color: "red" }}></div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12 col-12">
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
                    {/* Input fields for name, description, price */}
                    {/* ... */}

                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Image</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
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

export default AddProduct;
