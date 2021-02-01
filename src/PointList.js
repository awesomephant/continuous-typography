import React from "react";
import Number from "./Number";

function PointList(props) {
  function updatePoint(i, key, value) {
    let newSetting = { ...props.setting };
    newSetting.points[i][key] = value;
    props.updateSetting(newSetting);
  }

  function deletePoint(i) {
    let newSetting = { ...props.setting };
    console.log(i)
    newSetting.points.splice(i, 1);
    props.updateSetting(newSetting);
  }

  const inputs = props.setting.points.map((p, i) => {
    let canDelete = true;
    if (i === 0 || i === props.setting.points.length - 1 ){
      canDelete = false
    }
    return (
      <li className="point" key={`p-${i}`}>
        <Number
          changeHandler={updatePoint.bind(this, i, "x")}
          name={`X${i}`}
          value={p.x}
        ></Number>
        <Number
          changeHandler={updatePoint.bind(this, i, "y")}
          name={`Y${i}`}
          value={p.y}
        ></Number>
        {canDelete &&
         <button onClick={(e) => deletePoint(i)} className="point-delete">X</button>
        }
      </li>
    );
  });

  return (
    <ul>{inputs}</ul>
  );
}

export default PointList;
