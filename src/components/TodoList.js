import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import CryptoJS from "crypto-js";
//import "./styles.css";

const TodoList = () => {
  const [openCount, countOpenTodos] = useState(0); //Zählwert für offene Todos
  const [todos, setTodos] = useState(() => {
    //Todos setzten; dranhängen
    const items = localStorage.getItem("items");
    const parsed = JSON.parse(items);
    return parsed || [];
  });
  const [titleInput, setTitleInput] = useState(""); //TITLE
  const [noteInput, setNoteInput] = useState(""); //NOTE
  const changeText = (e) => {
    //damit die Seite nicht immer refreshed
    setTitleInput(e.target.value);
  };

  const changeNote = (e) => {
    //damit die Seite nicht immer refreshed
    setNoteInput(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    const myID = function generateId(title, text, length = 10) {
      //length = 10 ist der Default-Wert
      return CryptoJS.SHA256(title + text + new Date())
        .toString()
        .substring(0, length);
    };

    const newTodos = [
      ...todos,
      {
        title: titleInput,
        note: noteInput,
        done: false,
        id: myID(titleInput, noteInput),
      },
    ];

    setTodos(newTodos);
    setTitleInput("");
    setNoteInput("");
  };

  const countOpen = () => {
    //Funktion zum zählen der offnen Todos
    const donetodos = todos.filter((item) => {
      return !item.done;
    });
    countOpenTodos(donetodos.length);
  };

  const changeTodo = (index) => {
    //Funktion für Farbeändern; GLAUB ICH
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

  const editTodo = () => {
    console.log("HEIR");
  };

  useEffect(() => {
    //spezieller REACT-Hook
    countOpen();
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="main-page">
      <h1 className="my-todos">My Notes</h1>
      <h2 className="open-todos">Open Notes: {openCount}</h2>
      <form>
        <input
          className="input__title"
          onChange={changeText}
          value={titleInput} //2-way-data binding
          type="text"
          autoFocus
          placeholder="Titel"
        />
        <textarea
          onChange={changeNote}
          id="text"
          className="input__text"
          value={noteInput}
          type="text"
          //name="text"
          placeholder="Enter note ..."
          //spellCheck="false"
          rows="6"
        ></textarea>
        <input onClick={submit} type="submit" value="Add todo" />
      </form>
      {todos.map((item, index) => {
        return (
          <Todo
            title={item.title}
            note={item.note}
            done={item.done}
            key={index}
            index={index}
            onChangeTodo={changeTodo}
            onDeleteTodo={deleteTodo}
            updateTodo={editTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
