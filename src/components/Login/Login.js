import React, { Fragment, useState, useRef } from "react";
import "./Login.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { todoActions } from "../../store/todoSlice";
import Btn from "../UI/Btn";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const path = isLogin ? "/login" : "/signup";

    // const tokenRaw = await axios.post(`/api/users${path}`, {
    // const tokenRaw = await axios.post(`https://gil-todo-app.herokuapp.com/api/users${path}`, {
    const tokenRaw = await axios.post(`${process.env.REACT_APP_API_URL}/users${path}`, {
    // const tokenRaw = await axios.post(
    //   `http://localhost:5000/api/users${path}`,
    //   {
        email,
        password,
      }
    );
    const token = tokenRaw.data;

    dispatch(todoActions.setToken(token));
    history.push("/todos");
  };

  return (
    <Fragment>
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h1 className="login-form-title">Welcome!</h1>

        <div className="login-form-email">
          <label htmlFor="email">Email</label>
          <input type="email" ref={emailRef} />
        </div>

        <div className="login-form-password">
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordRef} />
        </div>

        <Btn text={isLogin ? "Login" : "Sign Up"} />

        <p onClick={() => setIsLogin((prevState) => !prevState)}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>
      </form>
    </Fragment>
  );
};

export default Login;
