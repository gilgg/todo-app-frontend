import React, { Fragment, useState } from "react";
import "./Todo.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../../store/todoSlice";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import TodoForm from "./TodoForm";

const Todo = ({ id, desc, isCompleted }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.todo.darkMode);
  const token = useSelector((state) => state.todo.token);
  const [isEdit, setIsEdit] = useState(false);
  const [isCompletedVal, setIsCompletedVal] = useState(isCompleted);
  // const httpReqUrl = `/api/todos/${id}`;
  const httpReqUrl = `https://gil-todo-app.herokuapp.com/api/todos/${id}`;
  // const httpReqUrl = `http://localhost:5000/api/todos/${id}`;

  const onEditIsCompletedHandler = async () => {
    setIsCompletedVal((prevState) => !prevState);
    const todos = await axios({
      method: "patch",
      url: httpReqUrl,
      headers: {
        Authorization: token,
      },
      data: {
        isCompleted: !isCompletedVal,
      },
    });
    dispatch(todoActions.setTodos(todos.data));
  };

  const onDeleteHandler = async () => {
    const todos = await axios.delete(httpReqUrl, {
      headers: {
        Authorization: token,
      },
    });
    dispatch(todoActions.setTodos(todos.data));
  };

  return (
    <Fragment>
      <div
        className={`todo ${isCompletedVal ? "completed" : ""} ${
          darkMode ? "dark" : ""
        }`}
      >
        <p className="todo-desc" onClick={onEditIsCompletedHandler}>
          {desc}
        </p>
        <div className="todo-icons">
          <span
            className="todo-icons-edit"
            onClick={() => setIsEdit((prevState) => !prevState)}
          >
            <BiEdit />
          </span>
          <span className="todo-icons-delete" onClick={onDeleteHandler}>
            <FiTrash2 />
          </span>
        </div>
      </div>

      <TodoForm
        type="update"
        id={id}
        show={isEdit}
        setShow={setIsEdit}
        defVal={desc}
      />
    </Fragment>
  );
};

export default Todo;
