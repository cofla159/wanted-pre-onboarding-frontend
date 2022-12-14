import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";

function Home() {
  return (
    <>
      <div className="flex flex-col p-10 items-center">
        <div className="text-2xl">로그인</div>
        <Login />
        <Link to="join" className="bg-slate-300 m-5 px-8 py-3">
          회원가입
        </Link>
      </div>
    </>
  );
}

export default Home;
