import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./product-list.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(
          `/products?sortBy=${sortBy}&sortOrder=${sortOrder}&searchQuery=${searchQuery}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchQuery, sortBy, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Search</h2>
        </div>
        <div className="sidebar-content">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
          <h2>Sort</h2>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <select value={sortOrder} onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="main-content">
        <h2>Products</h2>
        <div className="product-list-container">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <Link
                to={`/product/${product._id}`}
                className="card product-link"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
