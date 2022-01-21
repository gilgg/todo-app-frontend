import React, { useState, useRef } from "react";
import "./TodoForm.scss";
import "../../sass/common.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../../store/todoSlice";
import Btn from "../UI/Btn";

const TodoForm = ({ type, id, show = false, setShow, defVal = "" }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.todo.darkMode);
  const token = useSelector((state) => state.todo.token);
  const todoRef = useRef();
  const [todoVal, setTodoVal] = useState(defVal);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const todo = todoRef.current.value;

    if (!todo) {
      // not accepting empty strings as todos
      return;
    }

    if (type === "add") {
      setTodoVal(""); // clear the input when we add a new todo
    } else {
      setShow(false); // hide update form after its button is clicked
    }

    const todos = await axios({
      method: type === "add" ? "post" : "patch",
      url: `/api/todos${type === "add" ? "" : `/${id}`}`,
      headers: {
        Authorization: token,
      },
      data: {
        desc: todo,
      },
    });

    dispatch(todoActions.setTodos(todos.data));
  };

  return (
    <form
      className={`todo-form ${type} ${darkMode ? "dark" : ""} ${
        show ? "active" : ""
      }`}
      onSubmit={onSubmitHandler}
    >
      <input
        type="text"
        placeholder={type === "add" ? "Add a todo" : "Update"}
        value={todoVal}
        onChange={(e) => setTodoVal(e.target.value)}
        ref={todoRef}
        className={`todo-form-input ${darkMode ? "dark" : ""}`}
      />
      <Btn text={type === "add" ? "Add Todo" : "Update"} />
    </form>
  );
};

export default TodoForm;
