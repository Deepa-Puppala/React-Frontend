import React, { useReducer } from "react";
import { ACTIONS } from "../Utils/Constants";
function reducer(state: { count: number }, action: { type: string }) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
}
const AddUser = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const handleIncrement = () => {
    dispatch({ type: ACTIONS.INCREMENT });
  };

  const handleDecrement = () => {
    dispatch({ type: ACTIONS.DECREMENT });
  };

  return (
    <>
      <button onClick={handleIncrement}>+</button>
      {state.count}
      <button onClick={handleDecrement}>-</button>
    </>
  );
};

export default AddUser;
