import React from "react";
import { Link } from "react-router-dom";
import TodoLists from "../components/TodoLists";

function Todo() {
  return (
    <div className="flex flex-col items-center">
      <Link
        to="/"
        onClick={() => {
          window.localStorage.removeItem("token");
        }}
        className="self-end m-2"
      >
        로그아웃
      </Link>
      <div className="text-2xl">Todo List</div>
      <TodoLists />
    </div>
  );
}

export default Todo;
