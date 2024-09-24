import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SupplierDashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch the supplier's products when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://localhost:44305/api/Products"); // Replace with your API route
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
            await axios.delete(`https://localhost:44305/api/Products/${productId}`);
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
        <div>
            <h2>Supplier Dashboard</h2>
            <button onClick={handleAddProduct}>Add New Product</button>

            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => handleEdit(product.id)}>Edit</button>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupplierDashboard;
