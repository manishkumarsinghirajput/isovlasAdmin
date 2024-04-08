import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { http } from "../../config/axiosConfig";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    images: null,
    price: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handlePdfChange = (e) => {
    setData({
      ...data,
      images: e.target.files[0]
    });
  };

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const response = await http.get(`/api/v1/admin/ourproduct/Productview/${_id}`);
        const { name, images, price, description } = response.data.data.body;
        setData({ name, images, price, description });
      } catch (error) {
        console.error("Error fetching document data:", error);
      }
    };

    fetchDocumentData();
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
  
      // Check if there's an image and append it to form data
      if (data.images) {
        formData.append("images", data.images.url); // Append image URL
      }
  
      const response = await http.post(`/api/v1/admin/ourproduct/upproductdataupdateate/${_id}`, formData);
  
      if (response.data.statusCode === 200) {
        // Update local state with the updated product data
        setData(response.data.data); // Assuming your response data structure matches the state structure
  
        toast.success(response.data.message);
        navigate("/ourproduct");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Failed to update product. Please try again.";
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
                  <h3 style={{ color: "black" }}>Update</h3>
                </div>
                <div className="text-right">
                  <Link to={`/ourproduct`} className="btn btn-icon icon-left btn-primary shadow">
                    <i className=""></i>Back
                  </Link>
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
                        onChange={handleChange}
                      />
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
                        onChange={handleChange}
                      />
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
                        onChange={handleChange}
                      />
                      <div className="m-0 error_text" style={{ color: "red" }}></div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Image</label>
                      <input
              type="file"
              className="form-control"
              accept="image/*"
              name="images"
              onChange={handlePdfChange} // Update onChange to handle image selection
            />
                  
                  {/* {data.profileimage.map((imageUrl, imageIndex) => ( */}
          {/* <img
            key={imageIndex}
            alt={`Image ${imageIndex + 1}`}
            style={{ height: "35px", width: "35px", marginLeft: "40px"}}
            src={imageUrl}
            className="rounded-circle mr-1"
          /> */}
        {/* ))} */}
        {data.images && (
                        <img
                          alt={"Profile Image"}
                          style={{ height: "70px", width: "70px", marginLeft: "40px" }}
                          src={data.images}
                          className="rounded-circle mr-1"
                        />
                      )}
                      </div>
                  </div>

                  <div className="form-group text-center">
                    <button type="submit" className="btn btn-primary btn-lg btn-icon icon-right">
                      Update
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

export default ProductUpdate;
