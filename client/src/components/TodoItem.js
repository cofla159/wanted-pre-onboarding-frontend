import React, { useState } from "react";

const TodoItem = ({ todo, updateTodo, deleteHandler }) => {
  const [editing, setEditing] = useState(false);
  const [updateContent, setUpdateContent] = useState(todo.todo);

  return (
    <form className="flex gap-2 w-full">
      <input
        type="checkbox"
        checked={todo.isCompleted}
        id={todo.id}
        onChange={() => {
          updateTodo({ ...todo, isCompleted: !todo.isCompleted });
        }}
      />
      {editing ? (
        <>
          <input
            type="text"
            className="border-2 border-black"
            value={updateContent}
            onChange={(e) => {
              setUpdateContent(e.target.value);
            }}
          />
          <div>
            <button
              type="button"
              className="bg-slate-200 rounded-md mr-2"
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
              className="bg-slate-200 rounded-md"
              onClick={() => setEditing(false)}
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <span
            className={todo.isCompleted ? "line-through text-slate-400" : ""}
          >
            {todo.todo}
          </span>
          <div>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="bg-slate-200 rounded-md mr-2"
            >
              수정
            </button>
            <button
              type="button"
              onClick={(e) => deleteHandler(todo.id)}
              className="bg-slate-200 rounded-md"
            >
              삭제
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default TodoItem;
