import React, { useState } from "react";
import "./css/Viewport.scss";
function Viewport(props) {

  const [dragging, setDragging] = useState(false)
  const [x0, setX0] = useState(0)
  const [w0, setW0] = useState(0)
  const [xDelta, setXDelta] = useState(0)

  function handleMouseDown(index, e) {
    e.preventDefault()
    setDragging(index)
    setX0(e.clientX)
    setW0(props.width)
  }
  function handleMouseMove(e) {
    let sign = -1;
    if (dragging === "right") {
      sign = 1;
    }
    if (dragging){
      setXDelta(e.clientX - x0);
      props.setViewportWidth(w0 + xDelta * (2 * sign))
    }
  }

  function handleMouseUp() {
    setDragging(false)
    setX0(0)
  }

  return (
    <div className="viewport-container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="viewport" style={{ width: `${props.width}px` }}>
        <div onMouseDown={(e) => handleMouseDown("left", e)} onMouseUp={handleMouseUp} className="resize-handle left"></div>
        <div className="viewport-content">{props.children}</div>
        <div onMouseDown={(e) => handleMouseDown("right", e)} onMouseUp={handleMouseUp} className="resize-handle right"></div>
      </div>
    </div>
  );
}

export default Viewport;
