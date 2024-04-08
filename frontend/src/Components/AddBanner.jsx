import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpFileData } from "../../config/axiosConfig";
import { toast } from "react-toastify";

const AddBanner = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { name, image } = formData;
    
            if (!name || !image) {
                toast.error("Please provide both name and image.");
                return;
            }
    
            const formDataToSend = new FormData();
            formDataToSend.append("name", name);
            formDataToSend.append("image", image);
    
            const response = await httpFileData.post("/api/v1/admin/banner/add", formDataToSend);
    
            toast.success("Banner Added Successfully");
            navigate("/banner");
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Failed to add banner. Please try again.";
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
                                    <h3 style={{ color: "black" }}>Add Banner</h3>
                                </div>

                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="form-group col-md-12 col-12">
                                            <label style={{ color: "black" }}>Name</label>
                                            <input
                                                type="text"
                                                maxLength={30}
                                                className="form-control"
                                                value={formData.name}
                                                name="name"
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

export default AddBanner;
