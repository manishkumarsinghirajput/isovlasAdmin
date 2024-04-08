import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { http } from "../../config/axiosConfig";

const UserView = () => {
  const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));
  const { _id } = useParams();

  const [data, setData] = useState({
    email: "",
    createdAt: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`/api/v1/users/userdataview/${_id}`);
        const existingData = response.data.data.body;
        setData(existingData);
      } catch (error) {
        console.error("Error fetching driver data:", error);
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
                  <h3 style={{ color: "black" }}>Plan View</h3>
                </div>
                <div className="text-right">
                  <Link
                    to={`/userlist`}
                    className="btn btn-icon icon-left btn-primary shadow"
                  >
                    <i className=""></i>Back
                  </Link>
                </div>
                <div className="card-body p-0">
                  <div className="row">
                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Email</label>
                      <input
                        type="text"
                        maxLength={30}
                        className="form-control"
                        value={data.email}
                        name="email"
                        style={{ width: "100%" }}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12 col-12">
                      <label style={{ color: "black" }}>Date</label>
                      <input
                        type="text"
                        maxLength={30}
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

export default UserView;
