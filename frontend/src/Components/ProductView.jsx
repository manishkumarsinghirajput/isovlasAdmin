import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { http } from "../../config/axiosConfig";

const ProductView = () => {
  const { _id } = useParams();

  const [data, setData] = useState({
    name: "",
    email: "",
    price: "",
    description: "",
    images: [],
    createdAt: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`/api/v1/admin/ourproduct/Productview/${_id}`);
        const responseData = response.data.data.body;
        setData(responseData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [_id]);

  return (
    <section className="section">
      <div className="section-body p-3" style={{ borderRadius: "10px" }}>
        <div className="row mt-sm-4">
          <div className="col-12 col-md-12 col-lg-12 mx-auto text-left">
            <div className="card p-md-3 shadow">
              <form>
                <div className="section-header rounded py-4 shadow">
                  <h3 style={{ color: "black" }}>Product View</h3>
                </div>
                <div className="text-right">
                  <Link
                    to={`/ourproduct`}
                    className="btn btn-icon icon-left btn-primary shadow"
                  >
                    <i className=""></i>Back
                  </Link>
                </div>
                <div className="card-body p-0">
                  <div className="row">
                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={data.name}
                        name="name"
                        disabled
                      />
                    </div>
                  </div>
                 
                  <div className="row">
                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Price</label>
                      <input
                        type="text"
                        className="form-control"
                        value={data.price}
                        name="price"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={data.description}
                        name="description"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Images</label>
                      {data.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={`Image ${index}`}
                          style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "10px" }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Date</label>
                      <input
                        type="text"
                        className="form-control"
                        value={new Date(data.createdAt).toLocaleDateString()}
                        name="createdAt"
                        disabled
                      />
                    </div>
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

export default ProductView;
