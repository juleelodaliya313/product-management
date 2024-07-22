import React from "react";

const CartItem = ({ id, image, price, title, description, handleClick }) => {
  const truncateText = (text, length) => {
    return text?.length > length ? `${text?.slice(0, length)}...` : text;
  };

  return (
    <>
      <div className="cart-item" key={id}>
        <h5>$ {price}</h5>
        <div className="cart-img">
          <img src={image} alt={title} />
        </div>
        <h4>{truncateText(title, 20)}</h4>
        <p>{truncateText(description, 50)}</p>
        <button className="btn" onClick={handleClick}>
          Delete
        </button>
      </div>
    </>
  );
};

export default CartItem;
