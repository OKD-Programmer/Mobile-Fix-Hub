import React from "react";
import {ProductsItems} from "../Components/ProductsItems";
import "../Styles/products.css";

export const ProductsList = ({ title, items = [] }) => {
  return (
    <section className="products-list-container">
      {title && <h2 className="products-list-title">{title}</h2>}
      <div className="product-grid">
        {items && items.length > 0 ? (
          items.map((item, i) => (
            <ProductsItems
            key={i}
            item={item} />
          ))
        ) : (
          <p className="no-products">No products found</p>
        )}
      </div>
    </section>
  );
}
