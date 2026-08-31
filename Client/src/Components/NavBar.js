import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/NavBar.css";
import logo from '../imgs/logo-removebg-preview.png';
import { CartButton } from "./CartButton";
import { useTheme } from "../context/ThemeContext";
import '../Styles/theme.css'
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useTheme();
    // ADDED: clearCart to the destructured useCart
    const { totalItemsCount, clearCart } = useCart(); 

    // Get role
    const { user, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleServiceSelect = () => {
        setIsDropdownOpen(false);
    };

    // UPDATED: Handle Logout
    const handleLogout = () => {
        logout();      // 1. Logout from Auth
        clearCart();   // 2. Clear the items from LocalStorage
        navigate('/login');
    };

    return (
        <div className="NavBar">
            <Link to={"/"} className="NavBar-logo">
                <img src={logo} alt="img not found" />
            </Link>
            <nav className="NavBar-Links">
                <Link to="/" >Home</Link>

                <div
                    className="services-dropdown"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <Link className="nav-link">
                        Services
                    </Link>

                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <Link
                                to="/Repair"
                                onClick={handleServiceSelect}
                            >
                                Repair
                            </Link>
                            <Link
                                to="/phones"
                                onClick={handleServiceSelect}
                            >
                                Phones
                            </Link>
                            <Link
                                to="/Parts"
                                onClick={handleServiceSelect}
                            >
                                Parts
                            </Link>
                            <Link
                                to="/accessories"
                                onClick={handleServiceSelect}
                            >
                                Accessories
                            </Link>
                        </div>
                    )}
                </div>

                {/* Only show Management Dropdown if role is 'admin' */}
                {role === 'admin' && (
                    <div
                        className="services-dropdown"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <Link className="nav-link">
                            Management
                        </Link>

                        {isDropdownOpen && (
                            <div className="dropdown-content">
                                <Link
                                    to="/phonemanagement"
                                    onClick={handleServiceSelect}
                                >
                                    Phones
                                </Link>
                                <Link
                                    to="/partsmanagement"
                                    onClick={handleServiceSelect}
                                >
                                    Parts
                                </Link>
                                <Link
                                    to="/accessoriesmanagement"
                                    onClick={handleServiceSelect}
                                >
                                    Accessories
                                </Link>
                                <Link
                                    to="/admin-dashboard"
                                    onClick={handleServiceSelect}
                                >
                                    Orders
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                <Link to="/Contact" className="nav-link">Contact</Link>

                <div className="nav-right">
                    <button className="btn" onClick={toggleDarkMode}>
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>

                    {user ? (
                        <button className="btn logout-btn" onClick={handleLogout}>
                            Logout ({user.name})
                        </button>
                    ) : (
                        <Link to="/login" className="btn login-btn">
                            Login
                        </Link>
                    )}

                    <CartButton count={totalItemsCount} />
                </div>
            </nav>
        </div>
    );
}
