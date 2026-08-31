import { useEffect, useState } from "react";
import axios from "axios";
import { ProductsList } from "../Components/ProductsList"; // Import ProductsList
import SearchBar from "../Components/SearchBar"; // Import SearchBar
import "../Styles/products.css";

export const Parts = () => {
  const [parts, setParts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/parts");
        setParts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchParts();
  }, []);

  // Filter parts based on the search term
  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Replacement Parts</h1>

      {/* Add the SearchBar component */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Use the ProductsList component */}
      <ProductsList items={filteredParts} />
    </div>
  );
};
