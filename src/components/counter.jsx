import "./counter.css";
import { useState } from "react";

export default function Counter() {
  //jsx component
  // let count = 0;

  const [count, setCount] = useState(0);

  function handleIncrease() {
    //js function
    // count = count + 1;

    setCount(count + 1);
    console.log("count is now:" + count);
  }

  function handleDecrease() {
    if (count > 0) {
      setCount(count - 1);
    }
    console.log("count is now:" + count);
  }

  function handleReset() {
    setCount(0);
    console.log("count is now:" + count);
  }

  return (
    <div className="counter">
      <div className="count">
        <div>{count}</div>
        <button className="btn-increase" onClick={handleIncrease}>
          Increase
        </button>
        <button className="btn-decrease" onClick={handleDecrease}>
          Decrease
        </button>
        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>

        <p className="msg">
          {count >= 10 && "Amazing You have reached count of 10"}
        </p>
      </div>
    </div>
  );
}
