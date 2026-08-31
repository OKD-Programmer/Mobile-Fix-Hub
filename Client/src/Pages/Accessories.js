import { useEffect, useState } from "react";
import axios from "axios";
import { ProductsList } from "../Components/ProductsList"; // Import ProductsList
import SearchBar from "../Components/SearchBar"; // Import SearchBar
import "../Styles/products.css";

export const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/accessories");
        setAccessories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAccessories();
  }, []);

  // Filter accessories based on the search term
  const filteredAccessories = accessories.filter((acc) =>
    acc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Accessories</h1>

      {/* Add the SearchBar component */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Use the ProductsList component */}
      <ProductsList items={filteredAccessories} />
    </div>
  );
};
