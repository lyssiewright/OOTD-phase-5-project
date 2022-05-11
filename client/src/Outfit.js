import React, { useState } from "react";



function Outfit({outfit}) {



    
  return (
    <div style={{
        padding: 20,
        boxShadow: "0.7em .5em 3em 0 pink",
        marginTop: "2vw"
       }}>
        <h3>{outfit.outfit}</h3>
       <img style={{
           height: 300,
           width: "auto",
           marginInline: 10
       }}
           src={outfit.top_img}/>
       <img style={{
            height: 300,
            width: "auto",
       }}
            src={outfit.bottom_img}/>
    </div>
  );
}

export default Outfit;