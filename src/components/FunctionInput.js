import React, { useState, useEffect } from "react";

function FunctionInput({ index, func, updateFunction, removeFunction }) {
  const [expression, setExpression] = useState(func.expression);
  const [color, setColor] = useState(func.color);
  const [valid, setValid] = useState(func.valid);

  useEffect(() => {
    try {
      const x = 1;
      const fn = new Function("x", `return ${expression}`);
      fn(x);
      setValid(true);
    } catch (e) {
      setValid(false);
    }
    updateFunction(index, { expression, color, valid });
  }, [expression, color]);

  return (
    <div className="function-input">
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter function (JS syntax)"
        className={valid ? "" : "invalid"}
      />
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <button onClick={() => removeFunction(index)}>Remove</button>
      {!valid && <span className="warning">Invalid syntax</span>}
    </div>
  );
}

export default FunctionInput;