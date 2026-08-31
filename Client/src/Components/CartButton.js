import React from "react";
import { Link } from "react-router-dom";

export const CartButton = ({ count }) => {
  return (
    <div className="cart-button-wrapper">
      <Link to="/cart" className="nav-link">
        🛒 Cart
        {/* Display the badge if count is greater than 0 */}
        {count > 0 && (
          <span className="cart-badge">
            {count}
          </span>
        )}
      </Link>
    </div>
  );
};

