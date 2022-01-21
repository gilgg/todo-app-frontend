import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/todoSlice";

const useFetchTodos = (token) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTodos = async () => {
      if (token) {
        const todos = await axios.get(
          `${process.env.REACT_APP_API_URL}/todos`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(todoActions.setTodos(todos.data));
      }
    };
    getTodos();
  }, [token, dispatch]);
};

export default useFetchTodos;
