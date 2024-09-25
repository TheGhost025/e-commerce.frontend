import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupplierNavBar from "./SupplierNavBar";

const SupplierManageProduct = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch the supplier's products when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("https://localhost:44305/api/Products", {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${token}`
                    }
                  }); // Replace with your API route
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Handle product deletion
    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://localhost:44305/api/Products/${productId}`, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`
                }
              });
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Navigate to the edit product page
    const handleEdit = (productId) => {
        navigate(`/supplier/editproduct/${productId}`);
    };

    // Navigate to the add product page
    const handleAddProduct = () => {
        navigate("/supplier/addproduct");
    };

    return (
        <SupplierNavBar>      
            <div className="container mt-5">
                <button className="btn btn-success mb-3" onClick={handleAddProduct}>Add New Product</button>

                <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                        <button className="btn btn-primary me-2" onClick={() => handleEdit(product.id)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
      </SupplierNavBar>
    );
};

export default SupplierManageProduct;
