import React from "react";

function Footer() {
  return (
    <div
      className="footer"
      style={{
        width: "100%",
        height: 60,
        position: "absolute",
        bottom: 0,
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: 8,
        }}
      >
        Created by:{" "}
        |{" "}
        <a href="www.linkedin.com/in/lyssie-wright-509b32152">Lyssie Wright</a>
      </p>
    </div>
  );
}

export default Footer;