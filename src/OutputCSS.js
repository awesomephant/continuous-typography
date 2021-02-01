import React from "react";

function OutputCSS(props) {
  const settingCSS = props.settings.map((setting) => {
    let rules = setting.points.map((p, i) => {
      let slope = 0;
      let yIntersection = 0;
      const nextPoint = setting.points[i + 1];
      if (nextPoint) {
        slope = (nextPoint.y - p.y) / (nextPoint.x - p.x);
        yIntersection = p.y;
        return `
          ${setting.rule}: calc(${yIntersection}${setting.unit} + ${
          slope * props.viewportWidth
        }${setting.unit});`;
      }
    });
    return rules.join("");
  });

  const css = `
  .demo-paragraph p {
    ${settingCSS.join("")}
  }
  
  `;
  return <style className="outputCSS">{css}</style>;
}

export default OutputCSS;
