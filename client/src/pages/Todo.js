import React from "react";
import { Link } from "react-router-dom";
import TodoLists from "../components/TodoLists";

function Todo() {
  return (
    <>
      <Link
        to="/"
        onClick={() => {
          window.localStorage.removeItem("token");
        }}
      >
        로그아웃
      </Link>
      <div className="text-2xl">Todo List</div>
      <TodoLists />
    </>
  );
}

export default Todo;
