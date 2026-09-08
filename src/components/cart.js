import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./css/cart.css";

export const formatNPR = (amount) => {
  return new Intl.NumberFormat('ne-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0
  }).format(amount).replace('NPR', 'Rs.');
};

function Cart() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    totalItems, 
    subtotalNPR, 
    shippingNPR, 
    grandTotalNPR, 
    isFreeShipping 
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="continue-shopping-btn">Explore Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2>Shopping Cart ({totalItems} items)</h2>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="item-price">{formatNPR(item.priceNPR)}</p>
              </div>

              <div className="cart-quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  style={{ cursor: item.quantity >= item.stock ? "not-allowed" : "pointer", opacity: item.quantity >= item.stock ? 0.5 : 1 }}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                {formatNPR(item.priceNPR * item.quantity)}
              </div>

              <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
          <div className="summary-details">
            <p style={{ margin: "0 0 0.4rem" }}>Subtotal: {formatNPR(subtotalNPR)}</p>
            
            <p style={{ margin: "0 0 0.8rem", color: isFreeShipping ? "green" : "#666" }}>
              Shipping: {shippingNPR === 0 ? "FREE" : formatNPR(shippingNPR)}
              {!isFreeShipping && <span style={{ display: "block", fontSize: "0.8rem" }}>(Add {formatNPR(3000 - subtotalNPR)} more for Free Shipping over Rs. 3,000)</span>}
            </p>

            <h3 style={{ borderTop: "1px solid #ddd", paddingTop: "0.5rem" }}>
              Total: {formatNPR(grandTotalNPR)}
            </h3>

            <Link to="/checkout" className="checkout-btn" style={{ display: "inline-block", marginTop: "1rem" }}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;