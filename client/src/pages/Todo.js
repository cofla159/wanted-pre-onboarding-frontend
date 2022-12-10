/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [createContent, setCreateContent] = useState("");
  const accessToken = window.localStorage.getItem("token");

  const getTodos = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_ADDRESS + "todos",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTodos(response.data);
    } catch (error) {
      alert(
        `목록을 불러올 수 없습니다. 다시 접속해주세요: ${error.response.data.message}`
      );
    }
  };
  useEffect(() => {
    if (!accessToken) navigate("/");
    getTodos();
  }, []);

  return (
    <>
      <div className="text-2xl">Todo List</div>
      {todos?.map((todo) => {
        return (
          <>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              key={todo.id}
              id={todo.id}
            />
            <div>{todo.todo}</div>
          </>
        );
      })}
    </>
  );
}

export default Todo;
