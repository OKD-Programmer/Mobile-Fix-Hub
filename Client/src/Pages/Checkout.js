import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "../Styles/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useTheme(); // Required for Dark Mode styling

  // --- ALL HOOKS MUST BE HERE (Top Level) ---
  const { cart, clearCart, totalPrice, totalItemsCount } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: user ? user.name : "",
    email: user ? user.email : "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Get the authentication token
      const token = localStorage.getItem("token");

      // 2. Send the request WITH the Authorization Header
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          ...formData,
          cart,
          totalPrice,
        },
        {
          headers: { 
            Authorization: `Bearer ${token}` 
          },
        }
      );

      // 3. Success: Clear cart and navigate
      clearCart();
      navigate("/order-confirmation", { state: { orderDetails: response.data } });

    } catch (error) {
      console.error("Error placing order:", error);
      
      // Better error handling
      let errorMessage = "There was an error placing your order. Please try again.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);

    } finally {
      setIsSubmitting(false);
    }
  };

  // --- AUTH & CART CHECKS ---
  if (!user || !user.id) {
    return (
      <div className="page">
        <h1>Checkout</h1>
        <p>Please <Link to="/login">Login</Link> to proceed with checkout.</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page">
        <h1>Checkout</h1>
        <p>Your cart is empty. Add some items before proceeding to checkout.</p>
      </div>
    );
  }

  // --- RENDER ---
  // Add 'force-dark' class if darkMode is true
  const pageClass = `page checkout-page ${darkMode ? "force-dark" : ""}`;

  return (
    <div className={pageClass}>
      <h1>Checkout</h1>
      <div className="checkout-container">
        
        {/* --- LEFT SIDE: FORM --- */}
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customerName">Full Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Enter your full address..."
              ></textarea>
            </div>
            <button type="submit" className="checkout-btn" disabled={isSubmitting}>
              {isSubmitting ? "Placing Order..." : `Place Order - $${totalPrice.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* --- RIGHT SIDE: SUMMARY --- */}
        <div className="order-summary">
          <h2>Order Summary ({totalItemsCount} items)</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> (x{item.quantity}) - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="summary-total">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
