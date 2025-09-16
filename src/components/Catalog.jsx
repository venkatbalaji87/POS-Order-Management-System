import React from "react";

export default function Catalog({ products, onAdd, search, onSearch }) {
  return (
    <div className="catalog-wrapper">
      {/* Search Bar */}
      <div className="catalog-search">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          size={60}
        />

      </div>

      {/* Product Grid */}
      <div className="catalog">
        {products.length === 0 && <p>No products found</p>}
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <h4>{p.name}</h4>
            <div className="price">${p.price}</div>
            <button onClick={() => onAdd(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

