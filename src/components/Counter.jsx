import React from "react";
import { useDispatch } from "react-redux";
import {
  //   increment,
  decrement,
  incrementByAmount,
} from "../store/counter/counterSlice";
import { useCounter } from "../hooks/useCounter";

const Counter = () => {
  const [counter] = useCounter();
  const dispatch = useDispatch();
  return (
    <div>
      <p className="font-bold text-2xl text-center">{counter}</p>
      <div className="flex justify-center gap-4 p-3">
        <button
          onClick={() => dispatch(decrement())}
          className="border rounded-full py-1 px-3"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
          className="border rounded-full py-1 px-3"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
