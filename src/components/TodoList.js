import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const TodoList = () => {
  const [openCount, countOpenTodos] = useState(0); //Zählwert für offene Todos
  const [todos, setTodos] = useState(() => {
    //Todos setzten; dranhängen
    const items = localStorage.getItem("items");
    const parsed = JSON.parse(items);
    return parsed || [];
  });
  const [titleInput, setTitleInput] = useState(""); //Input

  const changeText = (e) => {
    //damit die Seite nicht immer refreshed
    setTitleInput(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    const newTodos = [...todos, { description: titleInput, done: false }];
    setTodos(newTodos);
    setTitleInput("");
  };

  const countOpen = () => {
    const donetodos = todos.filter((item) => {
      return !item.done;
    });
    countOpenTodos(donetodos.length);
  };

  const changeTodo = (index) => {
    const newTodos = [...todos]; //hier wird Kopie erstellt; niemals "echten" State verändern
    if (newTodos[index].done) {
      newTodos[index].done = false;
    } else {
      newTodos[index].done = true;
    }
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  useEffect(() => {
    countOpen();
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h1>Meine ToDos</h1>
      <h2>Offene Todos: {openCount}</h2>
      <form>
        <input
          onChange={changeText}
          value={titleInput} //2-way-data binding
          type="text"
          autoFocus
          placeholder="Neuer Eintrag"
        />
        <input onClick={submit} type="submit" value="Add todo" />
      </form>
      {todos.map((item, index) => {
        return (
          <Todo
            description={item.description}
            done={item.done}
            key={index}
            index={index}
            onChangeTodo={changeTodo}
            onDeleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
