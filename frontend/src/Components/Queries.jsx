import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { http } from "../../config/axiosConfig";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFilePdf } from 'react-icons/fa';

const Queries = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const getalltask = () => {
    http
      .get(`/api/v1/quoteRequest/quataionlist`)
      .then((res) => {
        console.log("Response data:", res.data); // Log the response data
        setData(res.data.data.body); // Update to access data correctly
        console.log("Data state:", data); // Log the data state
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
    setSearchTerm(value);
    http
      .post(`/api/v1/quoteRequest/SearchQuatation`, {
        name: value,
      })
      .then((res) => {
        setData(res.data.data.body); // Update to access data correctly
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

  const deleteHandler = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        http
          .post(`/api/v1/quoteRequest/deleteQuatation`, { id: _id })
          .then(() => {
            getalltask();
            toast.success("Product Deleted Successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
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
            console.error("Delete error:", error);
          });
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = data && Array.isArray(data) ? Math.ceil(data.length / itemsPerPage) : 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="section">
      <div className="section-header">
        <h1>DOCUMENT LIST</h1>
      </div>

      <div className="text-right">
        <Link
          to={`/documentadd`}
          className="btn btn-icon icon-left btn-primary shadow"
        >
          <i className=" "></i>ADD NEW
        </Link>
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
                  <th scope="col">Pdf</th>
                  <th scope="col">Created Date</th>
                  <th scope="col md">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>

                

                      <a href={item.pdfdata} target="_blank" rel="noopener noreferrer">
                        <FaFilePdf size={24} /> View PDF
                      </a>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>

                    <Link to={`/queriesview/${item._id}`} 
                        className="btn px-2 py-1 btn_hover btn-outline-success">
                          <i className="fas fa-eye" ></i>
                        </Link>
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="btn px-2 py-1 btn-outline-danger"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
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

export default Queries;
