import React from "react";
import splatter_paint from "./resources/splatter_paint.png";
import triangles from "./resources/triangles.png";
import hearts from "./resources/hearts.png"
import flowers from "./resources/flowers.png"

function SelectTheme() {
  const themes = [
    { src: splatter_paint, name: "Splatter Paint" },
    { src: triangles, name: "Triangles"},
    { src: hearts, name: "Hearts"},
    { src: flowers, name: "Flowers"}

  ];

  const options = themes.map((a) => (
    <option value={a.src} key={a.name}>
      {a.name}
    </option>
  ));

  return <>{options}</>;
}

export default SelectTheme;