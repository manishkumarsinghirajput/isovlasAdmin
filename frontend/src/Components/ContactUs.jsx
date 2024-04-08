import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { http } from "../../config/axiosConfig";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const getalltask = () => {
    http
      .post(`/api/v1/admin/contact/list`)
      .then((res) => {
        setData(res.data.data.data); // Update data with res.data.data.data
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
    getalltask();
  }, []);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update the search term state
    http
      .post(`/api/v1/admin/contact/contactsearch`, {
        name: value,
      })
      .then((res) => {
        setData(res.data.data.body); // Update the data state with the search results
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Something went wrong",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.error("Search error:", error);
      });
  };



  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

  const totalPages = Math.ceil(data.total / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="section">
      <div className="section-header">
        <h1>ContactUs</h1>
      </div>

      <div className="section-body">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={searchHandler}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table id="myTable" className="table">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Question</th>
                  <th scope="col">Created Date</th>
                  <th scope="col md">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((userData, index) => (
                  <tr key={userData._id}>
                    <td>{index + 1}</td>
                    <td>{userData.name}</td>
                    <td>{userData.question}</td>
                    <td>{new Date(userData.createdAt).toLocaleDateString()}</td>
                    <td>
                      <>
                        <Link to={`/contactusview/${userData._id}`} className="btn px-2 py-1 btn_hover btn-outline-success">
                          <i className="fas fa-eye"></i>
                        </Link>
                      
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ContactUs;
