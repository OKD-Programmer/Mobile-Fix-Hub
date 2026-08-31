import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../Styles/products.css";

const SERVER_URL = "http://localhost:5000/uploads/";

const Cart = () => {
  // Destructure ALL needed functions from context
  const { cart, removeFromCart, decreaseQuantity, addToCart, totalItemsCount, totalPrice } = useCart();

  return (
    <div className="page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty.</p>
          <p className="empty-cart-subtext">Add some products to get started!</p>
        </div>
      ) : (
        <div className="cart-container">
          <ul className="cart-list">
            {cart.map((item) => {
              const imageUrl = item.img ? `${SERVER_URL}${item.img}` : "/path/to/default-image.png";

              return (
                <li key={item.id || item._id} className="cart-item">
                  <img src={imageUrl} alt={item.name} />
                  
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                    
                    {/* --- QUANTITY CONTROLS --- */}
                    <div className="quantity-controls">
                      {/* MINUS: Pass the whole 'item' object */}
                      <button 
                        className="btn-small" 
                        onClick={() => decreaseQuantity(item)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      
                      <span className="quantity-display">{item.quantity}</span>
                      
                      {/* PLUS: Pass the whole 'item' object to increase quantity */}
                      <button 
                        className="btn-small" 
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                    
                    <p className="item-total">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* REMOVE: Pass the whole 'item' object */}
                  <button className="btn remove" onClick={() => removeFromCart(item)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="cart-summary">
            <div className="cart-totals">
              <p>Total Items: <strong>{totalItemsCount}</strong></p>
              <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
            </div>
            
            <Link to="/checkout" className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
