import "../Styles/filters.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
