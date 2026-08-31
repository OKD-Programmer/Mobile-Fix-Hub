import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
// Components & Pages
import {NavBar} from './Components/NavBar';
import {Footer} from './Components/Footer';
import {Home} from './Pages/Home';
import {Phones} from './Pages/Phones';
import {Repair} from './Pages/Repair';
import {Parts} from './Pages/Parts';
import {Accessories} from './Pages/Accessories';
import {ContactUs} from './Pages/ContactUs';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import OrderConfirmation from './Pages/OrderConfirmation';
import PhoneManagement from './Pages/PhoneManagement';
import PartsManagement from './Pages/PartsManagement';
import AccessoriesManagement from './Pages/AccessoriesManagement';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard';
import './App.css';

const AppContent = () => {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          {/* ... your routes ... */}
          <Route path="/" element={<Home />} />
          <Route path="/phones" element={<Phones />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/phonemanagement" element={<PhoneManagement />} />
          <Route path="/partsmanagement" element={<PartsManagement />} />
          <Route path="/accessoriesmanagement" element={<AccessoriesManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Repair" element={<Repair />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <ThemeProvider>
      {/* IMPORTANT: CartProvider is now INSIDE AuthProvider */}
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </Router>
);

export default App;