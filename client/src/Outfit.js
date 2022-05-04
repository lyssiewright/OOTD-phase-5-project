import React, { useState } from "react";



function Outfit({outfit}) {



    
  return (
    <div>
        <h3>{outfit.outfit}</h3>
       <img style={{
           height: 300,
           width: "auto",
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