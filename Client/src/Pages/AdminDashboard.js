import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const { role } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderItems, setOrderItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders on load
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders. Access denied.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Toggle Order Details (Fetch Items)
  const handleToggleDetails = async (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null); // Close if already open
      return;
    }

    setExpandedOrderId(orderId);

    // Fetch items only if not already loaded
    if (!orderItems[orderId]) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/orders/${orderId}/items`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrderItems((prev) => ({
          ...prev,
          [orderId]: response.data,
        }));
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    }
  };

  if (role !== "admin") {
    return (
      <div className="page">
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  if (loading) return <div className="page">Loading orders...</div>;
  if (error) return <div className="page error-message">{error}</div>;

  return (
    <div className="page dashboard-page">
      <h1>Admin Dashboard - Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p><strong>Customer:</strong> {order.customer_name} ({order.customer_email})</p>
                  <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                </div>
                <div className="order-price">
                  <h3>${parseFloat(order.total_price).toFixed(2)}</h3>
                  <button
                    className="btn-toggle"
                    onClick={() => handleToggleDetails(order.id)}
                  >
                    {expandedOrderId === order.id ? "Hide Items" : "View Items"}
                  </button>
                </div>
              </div>

              {/* Expandable Items Section */}
              {expandedOrderId === order.id && (
                <div className="order-items">
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems[order.id] && orderItems[order.id].length > 0 ? (
                        orderItems[order.id].map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.product_name}</td>
                            <td>{item.quantity}</td>
                            <td>${parseFloat(item.price).toFixed(2)}</td>
                            <td>${(item.quantity * item.price).toFixed(2)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4">No items found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
