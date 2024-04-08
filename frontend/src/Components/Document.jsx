import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { http } from "../../config/axiosConfig";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFilePdf } from 'react-icons/fa';
const Document = () => {


  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3)

  const getalltask = () => {
    http
      .post(`/api/v1/admin/document/list`)
      .then((res) => {
        setData(res.data.data.products); // Update data with res.data.data.products
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
  },[]);

    const searchHandler = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Update the search term state
        http
        .post(`/api/v1/admin/document/documentSearch`, {
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
          .post(`/api/v1/admin/ourproduct/remove`, { id: _id }) // Send user ID in the request body
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
  

  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

  // const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(data.length / itemsPerPage);
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
                  {/* <th scope="col">First Name</th>
              
                  <th scope="col">Images</th> */}
       
                  <th scope="col">Name</th>
                  <th scope="col">Pdf</th>
            
                  <th scope="col">Created Date</th>
        
                  <th scope="col md">Action</th>
                </tr>
              </thead>
              <tbody>
              {currentData.map((products, index) => (

                  <tr key={products._id}>
                    <td>{index + 1}</td>
       
                      <td>{products.name}</td>
      {/* <td>{<source />products.pdfUrl}</td> */}
       
      <td>
    <a href={products.pdfUrl} target="_blank" rel="noopener noreferrer">
        <FaFilePdf size={24} /> View PDF
    </a>
</td>

                    <td>{new Date(products.createdAt).toLocaleDateString()}</td>
                      {/* {userData.profileimage} */}
         {/* {userData.images.length > 0 && (
          <img
          alt={`Image for ${userData.images}`}
          style={{ height: "35px", width: "35px" }}
          src={userData.images[0]} // Only show the first image
          className="rounded-circle mr-1"
        />
         )} */}
         
                 
                   



                    <td>
                      <>
                        <Link to={`/documentview/${products._id}`}
                        className="btn px-2 py-1 btn_hover btn-outline-success">
                          <i className="fas fa-eye" ></i>
                        </Link>

                        <Link to={`/documentupdate/${products._id}`}
                        className="btn px-2 py-1 btn_hover btn-outline-success">
                          <i className="fas fa-edit"></i>
                        </Link>

                        <button
                          onClick={() => deleteHandler(products._id)}
                          className="btn px-2 py-1 btn-outline-danger"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
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

export default Document;