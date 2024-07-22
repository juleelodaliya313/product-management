import React, { useEffect, useState } from "react";
import "../Styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartItemCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItemCount(cart?.length);
    };

    updateCartItemCount();

    window.addEventListener("cartUpdated", updateCartItemCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartItemCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const navigateToCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/">Products</Link>
        </div>
        <div className="add-to-cart">
          <div className="count logout">
            <h2 onClick={navigateToCart}>
              Cart
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </h2>
          </div>
          <div className="logout">
            <h2 onClick={handleLogout}>Log Out</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
