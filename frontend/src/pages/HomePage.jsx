import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import { api } from "../services/api";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("products")
      .then((s) => {
        setProducts(s.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Is the backend running?");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading products...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="homepage">
      <h1 className="homepage-title">Featured Products</h1>
      <ProductList products={products} />
    </div>
  );
}
export default HomePage;
