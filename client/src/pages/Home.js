import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/todo");
    }
  });

  return (
    <div className="flex-col">
      <div>로그인</div>
      <input type="email" />
      <input type="password" />
      <input type="submit" />
      <Link to="signup">회원가입</Link>
    </div>
  );
}

export default Home;
