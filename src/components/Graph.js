import React from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from "recharts";

function Graph({ functions, xRange, yRange }) {
  const { min: xMin, max: xMax } = xRange;
  const { min: yMin, max: yMax } = yRange;

  const points = [];
  const step = (xMax - xMin) / 200;

  for (let x = xMin; x <= xMax; x += step) {
    const point = { x: parseFloat(x.toFixed(2)) };
    functions.forEach((fn, i) => {
      if (fn.valid && fn.expression) {
        try {
          const f = new Function("x", `return ${fn.expression}`);
          const y = f(x);
          point[`f${i}`] = isFinite(y) ? y : null;
        } catch {
          point[`f${i}`] = null;
        }
      } else {
        point[`f${i}`] = null;
      }
    });
    points.push(point);
  }

  return (
    <div className="graph-container">
      <LineChart width={800} height={500} data={points}>
        <CartesianGrid stroke="#ccc" />
        <XAxis type="number" dataKey="x" domain={[xMin, xMax]} />
        <YAxis type="number" domain={[yMin, yMax]} />
        <Tooltip />
        <Legend />
        {functions.map((fn, i) => (
          <Line
            key={i}
            type="monotone"
            dataKey={`f${i}`}
            stroke={fn.color}
            name={fn.expression}
            dot={false}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </div>
  );
}

export default Graph;