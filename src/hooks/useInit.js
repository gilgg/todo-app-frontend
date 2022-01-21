import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetchTodos from "./useFetchTodos";
import { todoActions } from "../store/todoSlice";

const useInit = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = useSelector((state) => state.todo.token);

  const tokenPersist = localStorage.getItem("token");
  if (!token && tokenPersist) {
    // in case we're already logged in (but just refreshed the page) then stay with the current token
    dispatch(todoActions.setToken(tokenPersist));
  }

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  useFetchTodos(token);

  return isLoggedIn;
};

export default useInit;
