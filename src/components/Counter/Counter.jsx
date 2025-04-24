"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from "../../store/slices/counterSlice";
import "./Counter.css";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const handleIncrementByAmount = () => {
    if (incrementAmount.trim() !== "") {
      dispatch(incrementByAmount(Number(incrementAmount) || 0));
    }
  };

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
        <button
          className="counter-button reset"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>

      <div className="counter-custom">
        <input
          type="number"
          className="counter-input"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          placeholder="Nhập số"
          min="1"
        />
        <button
          className="counter-button increment-by-amount"
          onClick={handleIncrementByAmount}
        >
          Tăng theo số
        </button>
      </div>
    </div>
  );
}

export default Counter;
