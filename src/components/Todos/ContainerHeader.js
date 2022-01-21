import React from "react";
import "./ContainerHeader.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DarkModeSwitch from "../Dark Mode/DarkModeSwitch";
import { todoActions } from "../../store/todoSlice";
import Btn from "../UI/Btn";

const ContainerHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.todo.token);

  const onLogout = async () => {
    await axios({
      method: "post",
      // url: `/api/users/logout`,
      url: `https://gil-todo-app.herokuapp.com/api/users/logout`,
      // url: `http://localhost:5000/api/users/logout`,
      headers: {
        Authorization: token,
      },
    });

    localStorage.removeItem("token");
    dispatch(todoActions.setToken(""));
    dispatch(todoActions.setTodos([]));
    dispatch(todoActions.clearDarkMode());

    history.replace("/");
  };

  return (
    <div className="container-header flex-justify-center">
      <div className="darkmode-logout-btns">
        <DarkModeSwitch />
        <Btn text="Logout" onClick={onLogout} />
      </div>
    </div>
  );
};

export default ContainerHeader;
