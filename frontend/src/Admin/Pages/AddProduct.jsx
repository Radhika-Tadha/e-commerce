import { useEffect, useState } from 'react';
import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function AddProduct() {
    const navigator = useNavigate();
    const location = useLocation();
    const EditProduct = location.state?.EditProduct || null;
    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState(null);
    const [Product, setProduct] = useState({
        name: '',
        price: '',
        size: '',
        p_detail: '',
        category: '',
        // image: '',
    });
    useEffect(() => {
        if (EditProduct) {
            setProduct({

                name: EditProduct.name || "",
                price: EditProduct.price || "",
                size: EditProduct.size || "",
                p_detail: EditProduct.p_detail || "",
                category: EditProduct.category || "",
            });
            setPreviewImage(`http://localhost:8000/uploads/${EditProduct.image}`);
        }
    }, [EditProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            if (image) {
                formData.append("image", image);
            }
            formData.append("name", Product.name);
            formData.append("price", Product.price);
            formData.append("size", Product.size);
            formData.append("p_detail", Product.p_detail);
            formData.append("category", Product.category);
            // formData.append("image", Product.image);

            for (let pair of formData.entries()) {
                console.log(pair[0] + ": ", pair[1]);
            }

            let res;
            if (EditProduct) {
                res = await axios.put(`http://localhost:8000/api/product/update/${EditProduct._id}`, formData, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                res = await axios.post("http://localhost:8000/api/product/insert", formData, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            if (res.status === 200 || res.status === 201) {
                alert(EditProduct ? "Product Updated" : "Product Created!");
                navigator("/ProductPage");
            } else {
                alert("Something went wrong!");
                console.error("Unexpected response:", res);
            }
        } catch (err) {
            alert("Error Occurred");
            console.error("Product Submit error:", err.response?.data || err.message);

        }
    };


    const handleChange = (e) => {
        setProduct({
            ...Product,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <div className="container vh-100" style={{ maxHeight: "100%", }}>
                <form className="row g-3 text-start" onSubmit={handleSubmit} encType="multipart/form-data">

                    <div className="col-12">Name
                        <input type="text" className="form-control" name='name' value={Product.name} onChange={handleChange} placeholder="Product name" />
                    </div>
                    <div className="col-md-6">Price
                        <input type="text" className="form-control" name='price' value={Product.price} onChange={handleChange} />
                    </div>


                    <div className="col-md-6">Size
                        <select
                            name="size"
                            className="form-select"
                            value={Product.size}
                            onChange={handleChange}
                        >
                            <option value="">Free Size</option>
                            <option value="S">S</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>

                    </div>
                    <div className="col-12">Product Detail
                        <input type="text" className="form-control" name='p_detail' value={Product.p_detail} onChange={handleChange} placeholder="Apartment, studio, or floor" />
                    </div>
                    <div className="col-md-12">Uploade Image
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                                setImage(e.target.files[0])
                                setPreviewImage(URL.createObjectURL(e.target.files[0]));
                            }
                            }
                        />
                        {previewImage && (
                            <div>
                                <p>
                                    Selected Image: {image ? image.name : EditProduct?.image}
                                </p>
                                <img
                                    src={previewImage}
                                    alt="Product Preview"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        objectFit: "cover",
                                        marginTop: "10px",
                                    }}
                                />
                            </div>
                        )}

                    </div>

                    <div className="mb-3">Category
                        <input
                            type="text"
                            className="form-control"
                            name='category'
                            placeholder="Enter category"
                            value={Product.category}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">{EditProduct ? "Update Product" : "Insert Product"}</button>
                    </div>
                </form>
            </div>
        </>
    )
};