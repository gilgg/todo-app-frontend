import { createSlice } from "@reduxjs/toolkit";

const initialTodoState = {
  token: "",
  todos: [],
  darkMode: false,
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: initialTodoState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setTodos(state, action) {
      state.todos = action.payload;
    },
    clearDarkMode(state) {
      state.darkMode = false;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
