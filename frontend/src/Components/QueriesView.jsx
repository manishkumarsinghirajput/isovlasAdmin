import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { http } from "../../config/axiosConfig";
import { FaFilePdf } from 'react-icons/fa';

const QueriesView = () => {
  const { _id } = useParams();

  const [documentData, setDocumentData] = useState({
    name: "",
    pdfdata: ""
  });

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const response = await http.get(`/api/v1/quoteRequest/quatationView/${_id}`);
        const { name, pdfdata } = response.data.data.body;
        setDocumentData({ name, pdfdata });
      } catch (error) {
        console.error("Error fetching document data:", error);
      }
    };

    fetchDocumentData();
  }, [_id]);

  return (
    <section className="section">
      <div className="section-body p-3" style={{ borderRadius: "10px" }}>
        <div className="row mt-sm-4">
          <div className="col-12 col-md-12 col-lg-12 mx-auto text-left">
            <div className="card p-md-3 shadow">
              <div className="section-header rounded py-4 shadow">
                <h3 style={{ color: "black" }}>Document View</h3>
              </div>
              <div className="text-right">
                <Link
                  to={`/document`}
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
                      maxLength={30}
                      className="form-control"
                      value={documentData.name}
                      name="name"
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12 col-12">
                    <label style={{ color: "black" }}>Pdf</label>
                    {documentData.pdfdata && (
                      <a href={documentData.pdfdata} target="_blank" rel="noopener noreferrer">
                        <FaFilePdf size={24} /> View PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QueriesView;
