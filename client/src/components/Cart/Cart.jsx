import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get("/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleIncrement = async (itemId) => {
    try {
      await api.put(`/cart/${itemId}`, { action: "increment" });
      updateCart();
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const handleDecrement = async (itemId) => {
    try {
      await api.put(`/cart/${itemId}`, { action: "decrement" });
      const updatedCartItems = cartItems
        .map((item) => {
          if (item._id === itemId) {
            if (item.quantity <= 1) {
              return null;
            } else {
              return { ...item, quantity: item.quantity - 1 };
            }
          }
          return item;
        })
        .filter(Boolean);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  const updateCart = async () => {
    try {
      const response = await api.get("/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.productId.price,
      0
    );
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart-content">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.productId.name}</td>
                <td>${item.productId.price}</td>
                <td className="quantity">
                  <button onClick={() => handleDecrement(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item._id)}>+</button>
                </td>
                <td>${item.quantity * item.productId.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-summary">
          <p>Total Price: ${getTotalPrice()}</p>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
