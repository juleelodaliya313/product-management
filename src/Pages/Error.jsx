import React from "react";
import "../Styles/error.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="error_page">
        <div className="error">
          <h1 className="title">Something went Wrong!</h1>
          <h1 className="aaa">404</h1>
          <h1 className="title">Page is Not Found</h1>
          <button className="btn" onClick={() => navigate("/")}>
            Back to Homepage
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
