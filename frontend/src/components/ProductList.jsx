import React from "react";

function ProductList({ products }) {
  // If there are no products, show a message
  if (!products || products.length === 0) {
    return <p className="no-products">No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            {/* Placeholder for image - we'll add real images later */}
            <span>📱</span>
          </div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price}</p>
          <p className="product-category">{product.category}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
