import React, { useEffect, useState } from "react";
import CartItem from "../Components/CartItem";
import "../Styles/home.css";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartData(cart);
  }, []);

  const handleDelete = (id) => {
    const updatedCart = cartData?.filter((item) => item?.id !== id);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <>
      <div>
        {cartData.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No items in the cart.
          </p>
        ) : (
          <div className="productsWrapper">
            {cartData &&
              cartData?.map((element) => (
                <CartItem
                  key={element?.id}
                  id={element?.id}
                  image={element?.images?.[0]}
                  category={element?.category}
                  price={element?.price}
                  title={element?.title}
                  description={element?.description}
                  handleClick={() => handleDelete(element?.id)}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
