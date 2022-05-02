import React, { useState } from "react";



function Outfit({outfit}) {



    
  return (
    <div>
        <h3>{outfit.outfit}</h3>
       <img src={outfit.top_img}/>
       <img src={outfit.bottom_img}/>
    </div>
  );
}

export default Outfit;