import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import Products from "../Components/Products";
import "../Styles/home.css";

const Home = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const authUser = localStorage.getItem("token");

  const limit = 10;

  useEffect(() => {
    const API = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${
            (currentPage - 1) * limit
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authUser}`,
            },
          }
        );

        const data = await res.json();
        setApiData(data?.products);
        setTotalPages(Math.ceil(data?.total / limit));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    API();
  }, [authUser, currentPage]);

  const handleClick = (id) => {
    const addData = apiData?.find((data) => data?.id === id);

    if (addData) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemExists = cart?.some((item) => item?.id === id);

      if (!itemExists) {
        cart.push(addData);
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Item added successfully");
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.info("Item already in cart");
      }
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productsWrapper">
            {apiData &&
              apiData?.map((element) => (
                <Products
                  key={element?.id}
                  id={element?.id}
                  image={element?.images?.[0]}
                  category={element?.category}
                  price={element?.price}
                  title={element?.title}
                  description={element?.description}
                  handleClick={() => handleClick(element?.id)}
                />
              ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div style={{ opacity: 0 }}>1</div>
        </>
      )}
    </div>
  );
};

export default Home;
