import React from "react";
import { useCart } from "../context/CartContext";
import { formatNPR } from "./cart";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Himalayan Cotton T-Shirt",
    priceNPR: 500,
    image: "https://via.placeholder.com/200?text=Rs+500+Shirt",
    description: "Comfortable everyday cotton t-shirt.",
    stock: 10
  },
  {
    id: 2,
    name: "Traditional Dhaka Topi & Scarf Set",
    priceNPR: 1000,
    image: "https://via.placeholder.com/200?text=Rs+1000+Set",
    description: "Authentic cultural pattern weaving set.",
    stock: 5
  },
  {
    id: 3,
    name: "Handmade Hemp Backpack",
    priceNPR: 2500,
    image: "https://via.placeholder.com/200?text=Hemp+Backpack",
    description: "Eco-friendly, durable hemp fabric backpack.",
    stock: 3
  }
];

function Products() {
  const { cart, addToCart } = useCart();

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h2>YanZee Collection - Shop (NPR)</h2>
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", 
          gap: "2rem", 
          marginTop: "1.5rem" 
        }}
      >
        {MOCK_PRODUCTS.map((product) => {
          const cartItem = cart.find(c => c.id === product.id);
          const currentCartQty = cartItem ? cartItem.quantity : 0;
          
          const isOutOfStock = product.stock === 0;
          const isMaxReached = currentCartQty >= product.stock;

          return (
            <div 
              key={product.id} 
              style={{ 
                border: "1px solid #eee", 
                borderRadius: "8px", 
                padding: "1rem", 
                textAlign: "center", 
                background: "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                opacity: isOutOfStock ? 0.6 : 1 
              }}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "4px" }} 
              />
              <h3 style={{ fontSize: "1.1rem", margin: "0.8rem 0 0.4rem" }}>{product.name}</h3>
              <p style={{ color: "#666", fontSize: "0.9rem", margin: "0 0 0.4rem" }}>{product.description}</p>
              
              <p style={{ color: isOutOfStock ? "red" : "green", fontSize: "0.9rem", margin: "0 0 0.8rem", fontWeight: "bold" }}>
                {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
              </p>

              <p style={{ fontWeight: "bold", fontSize: "1.2rem", margin: "0 0 1rem" }}>
                {formatNPR(product.priceNPR)}
              </p>
              
              <button
                onClick={() => addToCart(product)}
                disabled={isOutOfStock || isMaxReached}
                style={{
                  backgroundColor: (isOutOfStock || isMaxReached) ? "#ccc" : "#000",
                  color: "#fff",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "4px",
                  cursor: (isOutOfStock || isMaxReached) ? "not-allowed" : "pointer",
                  width: "100%",
                  fontWeight: "bold"
                }}
              >
                {isOutOfStock ? "Sold Out" : isMaxReached ? "Max Reached" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;