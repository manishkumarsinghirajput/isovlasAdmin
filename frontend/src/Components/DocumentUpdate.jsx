import React, { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { http } from "../../config/axiosConfig";
import { toast } from "react-toastify";

const DocumentUpdate = () => {
    const { _id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    pdfUrl: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handlePdfChange = (e) => {
    setData({
      ...data,
      pdfUrl: e.target.files[0],
    });
  };


  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const response = await http.get(`/api/v1/admin/document/DocumentView/${_id}`);
        const { name, pdfUrl } = response.data.data.body;
        setData({ name, pdfUrl });
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
      formData.append("pdfUrl", data.pdfUrl);

      const response = await http.post("/api/v1/admin/document/update", formData);

      setData({
        name: "",
        pdfUrl: null,
      });

      toast.success("Document Added Successfully");
      navigate("/document");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Failed to add document. Please try again.";
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
                  <h3 style={{ color: "black" }}>Update Document</h3>
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
                      <label style={{ color: "black" }}>UPLOAD PDF</label>
                      <input
                        type="file"
                        name="data.pdfUrl"
                        accept=".pdf"
                        onChange={handlePdfChange}
                        // required
                      />
                      <div className="m-0 error_text" style={{ color: "red" }}></div>
                    </div>
                  </div>

                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-icon icon-right"
                    >
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

export default DocumentUpdate;
