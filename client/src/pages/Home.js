import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";

function Home() {
  return (
    <>
      <div className="flex flex-col">
        <div>로그인</div>
        <Login />
        <Link to="join">회원가입</Link>
      </div>
    </>
  );
}

export default Home;
