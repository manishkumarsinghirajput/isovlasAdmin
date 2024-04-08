import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../../config/axiosConfig";

export function Dashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    users: 0,
    documents: 0,
    books: 0,
    products: 0,
    queries: 0
  });

  const getCounts = () => {
    http.get(`/api/v1/admin/dashboardCount`)
      .then((res) => {
        const { body, totald, totalb, productt, queriest } = res.data.data;
        setCounts({
          users: body,
          documents: totald,
          books: totalb,
          products: productt,
          queries: queriest
        });
      })
      .catch((err) => {
        var error = err.response.data.message;
        if (error === "Please Login First") {
          localStorage.clear();
          navigate("/");
        }
        console.error(err.message);
      });
  };

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <section className="section">
      <div className="section-header rounded py-4 shadow">
        <h1>Dashboard</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <Link to={"/userlist"} className="card card-statistic-1">
              <div className="card-icon bg-danger shadow">
                <i style={{ fontSize: "1.3rem", color: "white" }} className="fa-solid fa-users"></i>
              </div>
              <div className="card-wrap">
                <div className="card-header">
                  <h4>Users</h4>
                </div>
                <div className="card-body">{counts.users}</div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <Link to={"/document"} className="card card-statistic-1">
              <div className="card-icon bg-danger shadow">
                <i style={{ fontSize: "1.3rem", color: "white" }} className="fa-solid fa-file"></i>
              </div>
              <div className="card-wrap">
                <div className="card-header">
                  <h4>Documents</h4>
                </div>
                <div className="card-body">{counts.documents}</div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <Link to={"/banner"} className="card card-statistic-1">
              <div className="card-icon bg-danger shadow">
                <i style={{ fontSize: "1.3rem", color: "white" }} className="fa fa-product-hunt"></i>
              </div>
              <div className="card-wrap">
                <div className="card-header">
                  <h4>Banner</h4>
                </div>
                <div className="card-body">{counts.books}</div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <Link to={"/ourproduct"} className="card card-statistic-1">
              <div className="card-icon bg-danger shadow">
                <i style={{ fontSize: "1.3rem", color: "white" }} className="fa-solid fa-file"></i>
              </div>
              <div className="card-wrap">
                <div className="card-header">
                  <h4>OurProduct</h4>
                </div>
                <div className="card-body">{counts.products}</div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <Link to={"/queries"} className="card card-statistic-1">
              <div className="card-icon bg-danger shadow">
                <i style={{ fontSize: "1.3rem", color: "white" }} className="fa fa-question-circle"></i>
              </div>
              <div className="card-wrap">
                <div className="card-header">
                  <h4>Queries</h4>
                </div>
                <div className="card-body">{counts.queries}</div>
              </div>
            </Link>
          </div>
          {/* Add similar links for other counts */}
        </div>
      </div>
    </section>
  );
}
