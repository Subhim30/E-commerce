import './App.css';

import Signup from './components/signup';
import Login from './components/login';
import Cart from './components/cart';
import Products from './components/products';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';

import { CartProvider, useCart } from './context/CartContext';


// ===============================
// NAVBAR
// ===============================

function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();

  // Don't show the main navbar on Login / Signup pages
  if (
    location.pathname === '/login' ||
    location.pathname === '/signup'
  ) {
    return null;
  }

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        background: '#111',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >

      {/* Logo / Brand */}
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}
      >
        YanZee Collection
      </div>


      {/* Navigation Links */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center'
        }}
      >

        <Link
          to="/products"
          style={{
            color: '#fff',
            textDecoration: 'none'
          }}
        >
          Shop
        </Link>


        <Link
          to="/login"
          style={{
            color: '#fff',
            textDecoration: 'none'
          }}
        >
          Login
        </Link>


        <Link
          to="/signup"
          style={{
            color: '#fff',
            textDecoration: 'none'
          }}
        >
          Signup
        </Link>


        <Link
          to="/cart"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 'bold',
            background: '#333',
            padding: '6px 12px',
            borderRadius: '4px'
          }}
        >
          🛒 Cart ({totalItems})
        </Link>

      </div>

    </nav>
  );
}


// ===============================
// APP
// ===============================

function App() {
  return (
    <CartProvider>

      <BrowserRouter>

        <Navbar />

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Products />}
          />

          {/* Products */}
          <Route
            path="/products"
            element={<Products />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Signup */}
          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={<Cart />}
          />

        </Routes>

      </BrowserRouter>

    </CartProvider>
  );
}

export default App;