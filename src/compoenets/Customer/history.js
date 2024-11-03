import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerNavBar from './CustomerNacBar';

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:44305/api/purchase/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <CustomerNavBar>
       <div className="purchase-history-container">
        <h2 className="heading">Purchase History</h2>
        {loading ? (
          <div className="loading-indicator"></div>
        ) : history.length === 0 ? (
          <p className="no-history">No purchase history available.</p>
        ) : (
          <ul className="history-list">
            {history.map((order) => (
              <li key={order.orderId} className="history-item fade-in">
                <h3>Order ID: {order.orderId}</h3>
                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <h4>Items:</h4>
                <ul className="item-list">
                  {order.orderItems.map((item) => (
                    <li key={item.productId} className="item-entry">
                      <img
                        src={`https://localhost:44305${item.productImageUrl}`}
                        alt={item.productName}
                        className="product-image bounce-in"
                      />
                      <div className="item-details">
                        <strong>{item.productName}</strong> - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </CustomerNavBar>
  );
};

export default PurchaseHistory;
