import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./product-detail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await api.post("/cart", { productId: id });
      navigate("/cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-las">
      <h2 className="texty">Product Details</h2>
      <div className="product-detail-container">
        <div className="product-detail-image-container">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info-container">
          <h2>{product.name}</h2>
          <p>{product.more}</p>
          <p className="pricetag">$ {product.price} /-</p>
          <button className="but" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
