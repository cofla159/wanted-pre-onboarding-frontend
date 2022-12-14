import React, { useState } from "react";

const TodoItem = ({ todo, deleteHandler, completeHandler, updateTodo }) => {
  const [editing, setEditing] = useState(false);
  const [updateContent, setUpdateContent] = useState(todo.todo);
  if (editing) {
    return (
      <form key={todo.id}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          id={todo.id}
          onChange={completeHandler}
        />
        <input
          type="text"
          className="border-2 border-black"
          value={updateContent}
          onChange={(e) => {
            setUpdateContent(e.target.value);
          }}
        />
        <button
          type="button"
          className="border-2 border-black"
          onClick={() => {
            updateTodo({
              id: todo.id,
              todo: updateContent,
              isCompleted: todo.isCompleted,
            });
            setEditing(false);
          }}
        >
          완료
        </button>
        <button
          type="button"
          className="border-2 border-black"
          onClick={() => setEditing(false)}
        >
          취소
        </button>
      </form>
    );
  } else {
    return (
      <form key={todo.id}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          id={todo.id}
          onChange={completeHandler}
        />
        {todo.todo}
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="border-2 border-black"
        >
          수정
        </button>
        <button
          type="button"
          onClick={(e) => deleteHandler(todo.id)}
          className="border-2 border-black"
        >
          삭제
        </button>
      </form>
    );
  }
};

export default TodoItem;
