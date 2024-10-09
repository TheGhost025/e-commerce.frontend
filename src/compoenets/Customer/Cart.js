import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerNavBar from './CustomerNacBar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:44305/api/cart', {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('ProductId', cartItemId);
      formData.append('Quantity', newQuantity);
      await axios.put(
        'https://localhost:44305/api/cart/updateQuantity',
        formData
        ,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          }
        }
      );
      // Update cartItems state after successful update
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  return (
    <CustomerNavBar>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Your Cart</h2>
        {cartItems.length > 0 ? (
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={item.cartItemId}>
                <div className="card h-100">
                  <img
                    src={`https://localhost:44305${item.productImageURL}`}
                    alt={item.productName}
                    className="card-img-top"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.productName}</h5>
                    <p className="card-text">
                      Quantity: <strong>{item.quantity}</strong>
                    </p>
                    <p className="card-text">
                      Price: <strong>${item.price}</strong>
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor={`quantity-${item.cartItemId}`}>Quantity:</label>
                      <input
                        id={`quantity-${item.cartItemId}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.cartItemId, e.target.value)
                        }
                        className="form-control"
                        style={{ width: '60px' }}
                      />
                    </div>
                    <button className="btn btn-danger mt-auto">Remove from Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>
    </CustomerNavBar>
  );
};

export default Cart;