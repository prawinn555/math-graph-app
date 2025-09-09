import React, { useState } from "react";
import FunctionInput from "./components/FunctionInput";
import Graph from "./components/Graph";

const defaultColors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6"];

function App() {
  const [functions, setFunctions] = useState([
    { expression: "Math.sin(x)", color: defaultColors[0], valid: true },
  ]);
  const [xRange, setXRange] = useState({ min: -10, max: 10 });
  const [yRange, setYRange] = useState({ min: -10, max: 10 });

  const updateFunction = (index, newFunction) => {
    const updated = [...functions];
    updated[index] = newFunction;
    setFunctions(updated);
  };

  const addFunction = () => {
    if (functions.length < 10) {
      setFunctions([
        ...functions,
        { expression: "", color: defaultColors[functions.length % defaultColors.length], valid: true },
      ]);
    }
  };

  const removeFunction = (index) => {
    const updated = functions.filter((_, i) => i !== index);
    setFunctions(updated);
  };

  return (
    <div className="app">
      <h1>Math Function Grapher</h1>
      <div className="controls">
        {functions.map((fn, index) => (
          <FunctionInput
            key={index}
            index={index}
            func={fn}
            updateFunction={updateFunction}
            removeFunction={removeFunction}
          />
        ))}
        {functions.length < 10 && (
          <button className="add-button" onClick={addFunction}>Add Function</button>
        )}
        <div className="axis-controls">
          <div>
            <label>X min: </label>
            <input
              type="number"
              value={xRange.min}
              onChange={(e) => setXRange({ ...xRange, min: parseFloat(e.target.value) })}
            />
            <label>X max: </label>
            <input
              type="number"
              value={xRange.max}
              onChange={(e) => setXRange({ ...xRange, max: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <label>Y min: </label>
            <input
              type="number"
              value={yRange.min}
              onChange={(e) => setYRange({ ...yRange, min: parseFloat(e.target.value) })}
            />
            <label>Y max: </label>
            <input
              type="number"
              value={yRange.max}
              onChange={(e) => setYRange({ ...yRange, max: parseFloat(e.target.value) })}
            />
          </div>
        </div>
      </div>
      <Graph functions={functions} xRange={xRange} yRange={yRange} />
    </div>
  );
}

export default App;