import React, { useState } from "react";



function Outfit({outfit}) {

   


  return (
    <div>
       <img src={outfit.top_img}/>
       <h3>{outfit.top}</h3>
       <img src={outfit.bottom_img}/>
       <h3>{outfit.bottom}</h3>
    </div>
  );
}

export default Outfit;