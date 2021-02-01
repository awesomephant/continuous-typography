import React from "react";
import "./css/Section.scss";

export default function Section(props) {

  return (
    <section className="section">
      <header className="section-header">
        <h3 className="section-title">{props.title}</h3>
      </header>
      <div className="section-body">{props.children}</div>
    </section>
  );
}
