import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    // If data exists in localStorage, ensure every item has a quantity (default to 1 if missing)
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map(item => item.quantity ? item : { ...item, quantity: 1 });
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // FIXED: Robust addToCart function
  const addToCart = (product) => {
    setCart((prevCart) => {
      // 1. Get the product's unique ID (handle both 'id' and '_id')
      const productId = product.id || product._id;

      // 2. Check if this specific ID is already in the cart
      const existingItem = prevCart.find((item) => {
        const cartItemId = item.id || item._id;
        return cartItemId === productId;
      });

      if (existingItem) {
        // 3. If item exists, just increase its quantity by 1
        return prevCart.map((item) => {
          const cartItemId = item.id || item._id;
          if (cartItemId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        // 4. If item doesn't exist, add it to the list with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // FIXED: Remove item using its unique ID (not index)
  const removeFromCart = (product) => {
    const productId = product.id || product._id;
    setCart((prevCart) => prevCart.filter((item) => {
      const cartItemId = item.id || item._id;
      return cartItemId !== productId;
    }));
  };

  // Function to decrease quantity or remove if it's 1
  const decreaseQuantity = (product) => {
    const productId = product.id || product._id;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => {
        const cartItemId = item.id || item._id;
        return cartItemId === productId;
      });

      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => {
          const cartItemId = item.id || item._id;
          return cartItemId !== productId;
        });
      } else {
        return prevCart.map((item) => {
          const cartItemId = item.id || item._id;
          if (cartItemId === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // FIX: Calculate total items correctly (sum of all quantities)
  const totalItemsCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // FIX: Calculate total price correctly (price * quantity)
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        decreaseQuantity, 
        clearCart,
        totalItemsCount,
        totalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
