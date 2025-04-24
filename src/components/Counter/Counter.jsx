"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../store/slices/counterSlice";
import "./Counter.css";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="counter">
      <div className="counter-display">
        <h3>Count: {count}</h3>
      </div>
      <div className="counter-controls">
        <button
          className="counter-button decrement"
          onClick={() => dispatch(decrement())}
        >
          Giảm
        </button>
        <button
          className="counter-button increment"
          onClick={() => dispatch(increment())}
        >
          Tăng
        </button>
      </div>
    </div>
  );
}

export default Counter;
