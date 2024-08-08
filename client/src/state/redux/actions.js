import { setLogin } from "./reducer";

// This action can be dispatched when you have an updated user object.
export const updateUser = (updatedUser) => (dispatch, getState) => {
  // You can also access the current state if needed using getState()
  // For example, you might want to merge the updated user with the existing user
  const currentState = getState();
  const mergedUser = { ...currentState.global.user, ...updatedUser };

  // Dispatch the setLogin action with the updated user data
  dispatch(setLogin({ user: mergedUser, token: currentState.global.token }));
};
