import React, { useRef, useState } from "react";
import calculateValue from "./calculateValue";
import "./css/Graph.scss";

function min(arr, key) {
  let min = 99999;
  arr.forEach((el) => {
    if (el[key] < min) {
      min = el[key];
    }
  });
  return min;
}
function max(arr, key) {
  let max = 0;
  arr.forEach((el) => {
    if (el[key] > max) {
      max = el[key];
    }
  });
  return max;
}

function Graph(props) {
  const h = 75;
  const w = 100;

  const minY = min(props.setting.points, "y");
  const maxY = max(props.setting.points, "y");
  const minX = min(props.setting.points, "x");
  const maxX = max(props.setting.points, "x");
  const svgEl = useRef();
  const [draggingPoint, setDraggingPoint] = useState(false)

  function addPoint(i, point) {
    let newSetting = { ...props.setting };
    newSetting.points.splice(i, 0, point);
    props.updateSetting(newSetting);
  }
  function updatePoint(i, point) {
    let newSetting = { ...props.setting };
    newSetting.points[i] = point;
    props.updateSetting(newSetting);
  }

  function scaleY(value) {
    let normalised = (value - minY) / (maxY - minY);
    let scaled = h - normalised * (h);
    return scaled;
  }
  function scaleX(value) {
    let normalised = (value - minX) / (maxX - minX);
    let scaled = normalised * (w);
    return scaled;
  }

  function handlePointMouseDown(e, i) {
    setDraggingPoint(i)
  }
  function handlePointMouseUp(e, i) {
    setDraggingPoint(false);
  }
  function handleMouseMove(e) {
    if (draggingPoint !== false) {
      const normalX = (e.clientX - e.currentTarget.getBoundingClientRect().x) / e.currentTarget.getBoundingClientRect().width
      const x = Math.round(normalX * (maxX - minX))
      
      const normalY = 1 - (e.clientY - e.currentTarget.getBoundingClientRect().y) / e.currentTarget.getBoundingClientRect().height
      const y = normalY * (maxY - minY) + minY
      
      updatePoint(draggingPoint, { x: x, y: y })
    }
  }
  function handleClick(e) {
    // First we determine what the real x and y values for the new point are
    const normalX = (e.clientX - e.currentTarget.getBoundingClientRect().x) / e.currentTarget.getBoundingClientRect().width
    const x = Math.round(normalX * (maxX - minX))

    const normalY = 1 - (e.clientY - e.currentTarget.getBoundingClientRect().y) / e.currentTarget.getBoundingClientRect().height
    const y = normalY * (maxY - minY) + minY

    // Then we find where the point should go in the array
    let index = 0;
    for (let i = 0; i < props.setting.points.length; i++) {
      if (props.setting.points[i].x > x) {
        index = i;
        break;
      }
    }

    let p = {
      x: x,
      y: y
    }
    addPoint(index, p)
  }

  const points = props.setting.points.map((p) => {
    const x = p.x;
    const y = p.y;
    return { x: scaleX(x), y: scaleY(y) };
  });

  const pointString = points.map((p) => {
    return `${p.x},${p.y} `;
  });
  pointString.push(`${w}, ${points[points.length - 1].y} `)
  pointString.unshift(`${0}, ${points[0].y} `)

  const dots = props.setting.points.map((p, i) => {
    return <circle onMouseDown={(e) => handlePointMouseDown(e, i)} onMouseUp={(e) => handlePointMouseUp(e, i)} key={`dot-${i}`} cx={scaleX(p.x)} cy={scaleY(p.y)} r={1.5}></circle>;
  });
  return (
    <div className="graph" data-dragging={draggingPoint ? "true" : "false"}>
      <svg ref={svgEl} onMouseMove={handleMouseMove} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${w} ${h}`}>
        <rect className="graph-background" onClick={handleClick} x="0" y="0" width={w} height={h}></rect>
        <line className="graph-x"
          x1={scaleX(props.viewportWidth)}
          y1={100}
          x2={scaleX(props.viewportWidth)}
          y2={0}
        ></line>
        <polyline points={pointString}></polyline>
        {dots}
        <circle className="graph-value" key={`dot-value`} cx={scaleX(props.viewportWidth)} cy={scaleY(calculateValue(props.setting, props.viewportWidth))} r={1.5}></circle>
      </svg>
      <span className="graph-output">
      {calculateValue(props.setting, props.viewportWidth).toFixed(3)}{props.setting.displayUnit}
      </span>
    </div>
  );
}

export default Graph;
