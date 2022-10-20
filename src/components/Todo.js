import React, { useState } from "react";

const Todo = ({ description, done, onChangeTodo, index, onDeleteTodo }) => {
  return (
    //ternary operator
    <div className={done ? "mygreen" : "myred"}>
      <h1
        onClick={() => {
          //muss als Callback definiert werden; sonst infinite loop
          onChangeTodo(index);
        }}
      >
        {description}
      </h1>
      <button
        onClick={() => {
          //muss als Callback definiert werden; sonst infinite loop
          onDeleteTodo(index);
        }}
      >
        Löschen
      </button>
    </div>
  );
};

export default Todo;
