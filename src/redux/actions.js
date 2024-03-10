export const addUser = (object, generateUniqueId) => {
  return {
    type: "ADD_USER",
    payload: {
      id: generateUniqueId(),
      object,
      active: 1,
    },
  };
};

export const deleteUser = (userId) => {
  return {
    type: "DELETE_USER",
    payload: userId,
  };
};
