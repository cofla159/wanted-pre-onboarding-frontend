import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TodoItem from "./TodoItem";

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
  });

  const createHandler = async (e) => {
    e.preventDefault();
    if (!createContent.length) return;
    try {
      await axios.post(
        process.env.REACT_APP_API_ADDRESS + "todos",
        {
          todo: createContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCreateContent("");
      getTodos();
    } catch (error) {
      alert(
        `새로운 목록 추가에 실패했습니다. 다시 시도해주세요: ${error.response.data.message}`
      );
    }
  };

  const updateTodo = async ({ id, todo, isCompleted }) => {
    try {
      await axios.put(
        process.env.REACT_APP_API_ADDRESS + `todos/${id}`,
        {
          todo,
          isCompleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getTodos();
    } catch (error) {
      alert(
        `수정에 실패했습니다. 다시 시도해주세요: ${error.response.data.message}`
      );
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_API_ADDRESS + `todos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      getTodos();
    } catch (error) {
      alert(
        `삭제 처리에 실패했습니다. 다시 시도해주세요: ${error.response.data.message}`
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-start gap-2 my-4">
        {todos?.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              updateTodo={updateTodo}
              deleteHandler={deleteHandler}
              key={todo.id}
            />
          );
        })}
      </div>
      <form onSubmit={createHandler}>
        <input
          type="text"
          className="border-2 rounded-xl"
          value={createContent}
          onChange={(e) => setCreateContent(e.target.value)}
        />
        <button type="submit" className="bg-slate-200 rounded-md p-1 ml-2">
          추가
        </button>
      </form>
    </>
  );
}

export default Todo;
