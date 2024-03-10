const initialState = {
  user: {},
};

const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : [];
};

const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_USERS":
      return {
        ...state,
        user: loadUserFromLocalStorage(),
      };

    case "ADD_USER":
      const newUserAdd = action.payload;
      saveUserToLocalStorage(newUserAdd);
      return {
        ...state,
        user: newUserAdd,
      };
      const updatedTodosEdit = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      saveTodosToLocalStorage(updatedTodosEdit);
      return {
        ...state,
        todos: updatedTodosEdit,
      };

    case "DELETE_USER":
      const updatedUserDelete = {};
      saveUserToLocalStorage(updatedUserDelete);
      return {
        state,
        user: updatedUserDelete,
      };

    default:
      return state;
  }
};

export default userReducer;
