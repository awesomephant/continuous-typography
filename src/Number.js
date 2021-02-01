import React from "react";

function Number(props) {
  function handleChange(e) {
    props.changeHandler(parseFloat(e.currentTarget.value));
  }

  return (
    <label className={`number ${props.className}`}>
      <span>{props.name}</span>
      <input step={props.step} type="number" onChange={handleChange} value={props.value}></input>
    </label>
  );
}

export default Number;
