import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerNavBar from './CustomerNacBar';

const Purchase = () => {
  const [cartItems, setCartItems] = useState([]);
  const [purchaseStatus, setPurchaseStatus] = useState('');
  const [loading, setLoading] = useState(true);

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
      finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://localhost:44305/api/purchase/purchase',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setPurchaseStatus('Purchase successful!');
      setCartItems([]);
    } catch (error) {
      setPurchaseStatus('Error during purchase');
      console.error('Purchase error:', error);
    }
  };

  return (
    <CustomerNavBar>
      <div className="container mt-4 purchase-container">
        <h2 className="text-center mb-4">Review Your Cart</h2>
        {loading ? (
          <div className="loading-spinner"></div>
        ) : cartItems.length > 0 ? (
          <div>
            <ul className="list-group mb-4">
              {cartItems.map((item) => (
                <li
                  key={item.cartItemId}
                  className="list-group-item d-flex justify-content-between align-items-center cart-item fade-in"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={`https://localhost:44305${item.productImageURL}`}
                      alt={item.productName}
                      className="product-img bounce-in"
                    />
                    <span>{item.productName}</span>
                  </div>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.price}</span>
                </li>
              ))}
            </ul>
            <button className="purchase-button hover-zoom" onClick={handlePurchase}>
              Purchase
            </button>
            {purchaseStatus && (
              <p className={purchaseStatus === 'Purchase successful!' ? 'purchase-status' : 'error-status'}>
                {purchaseStatus}
              </p>
            )}
          </div>
        ) : (
          <p>Your cart is empty. Add items to your cart to proceed with a purchase.</p>
        )}
      </div>
    </CustomerNavBar>
  );
};

export default Purchase;
