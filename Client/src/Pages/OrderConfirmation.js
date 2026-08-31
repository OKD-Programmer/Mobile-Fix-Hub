import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../Styles/OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderDetails } = location.state || {};

    // Render Error State (If order details are missing)
    if (!orderDetails) {
        return (
            <div className="order-confirmation-page">
                <div className="confirmation-card">
                    <h1>Order Confirmation</h1>
                    <p>Sorry, we could not find your order details.</p>
                    <Link to="/" className="btn btn-primary">Go to Homepage</Link>
                </div>
            </div>
        );
    }

    // Render Success State
    return (
        <div className="order-confirmation-page">
            <div className="confirmation-card">
                <h1>Thank You for Your Order!</h1>
                <p>Your order has been placed successfully.</p>
                <div className="order-info">
                    <p><strong>Order ID:</strong> #{orderDetails.orderId}</p>
                    <p>We have sent a confirmation email to you.</p>
                </div>
                <Link to="/" className="btn btn-primary">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
