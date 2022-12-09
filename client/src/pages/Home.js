import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/todo");
    }
  });

  return (
    <>
      <input type="email" />
      <input type="password" />
      <input type="submit" />
    </>
  );
}

export default Home;
