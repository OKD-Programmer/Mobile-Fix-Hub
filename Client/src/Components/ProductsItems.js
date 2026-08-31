import { useCart } from "../context/CartContext";
import "../Styles/products.css";

// Define the server URL in one place for easy changes
const SERVER_URL = "http://localhost:5000/uploads/";

export const ProductsItems = ({ item }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(item);
    };

    // Construct the full image URL
    const imageUrl = item.img ? `${SERVER_URL}${item.img}` : "/path/to/default-image.png";

    return (
        <div className="product-card">
            <div
                className="product-image-background"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
            </div>

            <div className="product-info-overlay">
                <h3>{item.name}</h3>
                <p className="brand">Brand: {item.brand}</p>
                {item.condition && <p className="condition">Condition: {item.condition}</p>}
                {item.price ? (
                    <p className="price">${item.price}</p>
                ) : item.location ? (
                    <p className="location">📍 {item.location}</p>
                ) : null}

                {/* --- FIX FOR PHONE SPECS --- */}
                {/* Check for specs in a nested object OR as direct properties */}
                { (item.specs && Object.keys(item.specs).length > 0) || item.storage || item.ram || item.screen || item.battery ? (
                    <div className="specs">
                        <h4>Specifications:</h4>
                        <ul>
                            {item.specs?.storage && <li>Storage: {item.specs.storage}</li>}
                            {item.specs?.ram && <li>RAM: {item.specs.ram}</li>}
                            {item.specs?.screen && <li>Screen: {item.specs.screen}</li>}
                            {item.specs?.battery && <li>Battery: {item.specs.battery}</li>}

                            {/* Fallback for direct properties from the phones API */}
                            {!item.specs?.storage && item.storage && <li>Storage: {item.storage}</li>}
                            {!item.specs?.ram && item.ram && <li>RAM: {item.ram}</li>}
                            {!item.specs?.screen && item.screen && <li>Screen: {item.screen}</li>}
                            {!item.specs?.battery && item.battery && <li>Battery: {item.battery}</li>}
                        </ul>
                    </div>
                ) : null}

                {/* --- FIX FOR PARTS COMPATIBILITY --- */}
                {/* Check if 'compatible' exists and handle it as a string or array */}
                {item.compatible && (
                    <div className="compatible">
                        <strong>Compatible with:</strong> {Array.isArray(item.compatible) ? item.compatible.join(", ") : item.compatible}
                    </div>
                )}

                {/* Category */}
                {item.category && (
                    <div className="category">
                        <strong>Category:</strong> {item.category}
                    </div>
                )}
            </div>

            <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};
