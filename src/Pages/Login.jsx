import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [inputField, setInputField] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setInputField({
      ...inputField,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: inputField?.username,
          password: inputField?.password,
        }),
      });

      const data = await res.json();

      if (data?.token) {
        toast.success("successfully login");
        navigate("/");
        setInputField({
          username: "",
          password: "",
        });
        localStorage.setItem("token", data?.token);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const authUser = localStorage.getItem("token");

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (
    <>
      <div className="employee-form">
        <div className="login_container">
          <h1 className="login_title">Login</h1>

          <form className="login_form" onSubmit={handleSubmit}>
            <div className="input-div">
              <label>Username :- </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={inputField?.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="input-div">
              <label>Password :- </label>
              <input
                type="password"
                placeholder="Enter Password..."
                name="password"
                value={inputField?.password}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="login_btn"
              disabled={!inputField?.password?.length}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
