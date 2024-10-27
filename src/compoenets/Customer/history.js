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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <CustomerNavBar>
      <div>
        <h2>Purchase History</h2>
        {history.length === 0 ? (
          <p>No purchase history available.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {history.map((order) => (
              <li key={order.orderId} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
                <h3>Order ID: {order.orderId}</h3>
                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <h4>Items:</h4>
                <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                  {order.orderItems.map((item) => (
                    <li key={item.productId} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <img
                        src={`https://localhost:44305${item.productImageUrl}`}
                        alt={item.productName}
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                      />
                      <div>
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
