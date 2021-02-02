import React, { useState } from "react";
import Section from "./Section";
import Graph from "./Graph";
import Viewport from "./Viewport";
import PointList from "./PointList";
import Number from "./Number";
import calculateValue from "./calculateValue";
import SampleText from "./SampleText"

import "./css/Demo.scss";
function Demo() {

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth * .5);
  const [fontSize, setFontSize] = useState({
    points: [
      { x: 0, y: 15 },
      { x: 350, y: 15 },
      { x: 450, y: 18 },
      { x: 800, y: 22 },
      { x: 2000, y: 28 },
    ],
    displayUnit: "px"
  });
  const [lineHeight, setLineHeight] = useState({
    points: [
      { x: 0, y: 1.5 },
      { x: 700, y: 1.4 },
      { x: 2000, y: 1.5 },
    ],
    displayUnit: ""
  });
  const [letterSpacing, setLetterSpacing] = useState({
    points: [
      { x: 0, y: .001 },
      { x: 350, y: -.003 },
      { x: 1200, y: -.005 },
      { x: 2000, y: -.01 },
    ],
    displayUnit: "em"
  });
  const [opticalSize, setOpticalSize] = useState({
    points: [
      { x: 0, y: 8 },
      { x: 400, y: 12 },
      { x: 800, y: 30 },
      { x: 2000, y: 30 },
    ],
    displayUnit: ""
  });

  const demoStyle = {
    fontSize: `${calculateValue(fontSize, viewportWidth)}px`,
    lineHeight: `${calculateValue(lineHeight, viewportWidth)}`,
    letterSpacing: `${calculateValue(letterSpacing, viewportWidth)}em`,
    fontVariationSettings: `"opsz" ${calculateValue(opticalSize, viewportWidth)}`
  }

  return (
    <div className="demo">
      <header className="demo-header">Continuous Typography Tester (<a href="https://maxkoehler.com/work/continuous-type-tester/">Information</a>)</header>
      <section className="settings">
        <header className="panel-header">
          <h2>Settings</h2>
        </header>
        <main>
          <Section title="Font Size">
            <Graph viewportWidth={viewportWidth} setting={fontSize} updateSetting={setFontSize}></Graph>
            <PointList updateSetting={setFontSize} setting={fontSize}></PointList>
          </Section>
          <Section title="Optical Size">
            <Graph viewportWidth={viewportWidth} updateSetting={setOpticalSize} setting={opticalSize}></Graph>
            <PointList updateSetting={setOpticalSize} setting={opticalSize}></PointList>
          </Section>
          <Section title="Letter Spacing">
            <Graph updateSetting={setLetterSpacing} viewportWidth={viewportWidth} setting={letterSpacing}></Graph>
            <PointList updateSetting={setLetterSpacing} setting={letterSpacing}></PointList>
          </Section>
          <Section title="Line Height">
            <Graph updateSetting={setLineHeight} viewportWidth={viewportWidth} setting={lineHeight}></Graph>
            <PointList updateSetting={setLineHeight} setting={lineHeight}></PointList>
          </Section>
        </main>
      </section>
      <section className="result">
        <Viewport width={viewportWidth} setViewportWidth={setViewportWidth}>
          <Number className="viewport-width" value={viewportWidth} changeHandler={setViewportWidth}></Number>
          <div className="viewport-copy" style={demoStyle}>
            <SampleText></SampleText>
          </div>
        </Viewport>
      </section>
    </div>
  );
}

export default Demo;
