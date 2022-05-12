import React from "react";
import beige from "./resources/beige.jpeg";
import blue from "./resources/blue.jpeg";
import white from "./resources/white.jpeg"
import green from "./resources/green.jpeg";
import yellow from "./resources/yellow.jpeg";
import pink from "./resources/pink.jpeg"

function SelectTheme() {
  const themes = [
    { src: beige, name: "beige" },
    { src: blue, name: "blue"},
    { src: white, name: "white"},
    { src: green, name: "green"},
    { src: yellow, name: "yellow"},
    { src: pink, name: "pink"},
  ];

  const options = themes.map((a) => (
    <option value={a.src} key={a.name}>
      {a.name}
    </option>
  ));

  return <>{options}</>;
}

export default SelectTheme;