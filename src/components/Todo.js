import React, { useState } from "react";
import "./styles.css";

const Todo = ({
  title,
  note,
  done,
  onChangeTodo,
  index,
  onDeleteTodo,
  updateTodo,
}) => {
  return (
    //ternary operator
    <ul>
      <li className={done ? "mygreen" : "myred"}>
        <article
          className="note-entry"
          onClick={() => {
            //muss als Callback definiert werden; sonst infinite loop
            onChangeTodo(index);
          }}
        >
          <header className="note__title">{title}</header>
          <p className="note__text">{note}</p>
        </article>
        <div className="note__controls">
          <button
            className="note__controls_delete"
            onClick={() => {
              //muss als Callback definiert werden; sonst infinite loop
              onDeleteTodo(index);
            }}
          >
            Delete
          </button>
          <button
            className="note_controls_edit"
            onClick={() => {
              updateTodo();
            }}
          >
            Edit
          </button>
        </div>
      </li>
    </ul>
  );
};

export default Todo;
