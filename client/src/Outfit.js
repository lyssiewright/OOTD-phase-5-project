import React, { useState } from "react";



function Outfit({outfit, onDeleteOutfit}) {

    const [errors, setErrors] = useState([]);

    function handleDeleteClick(){
        fetch(`/outfits/${outfit.id}`, {
          method: "DELETE",
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((outfit) => onDeleteOutfit(outfit))
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    
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
        <button style={{
            display: "block"
            }}
            onClick={handleDeleteClick}>🗑️</button>
        {errors.map((err) => (
        <h3
          key={err}
           style={{ display: "block", margin: "auto", marginTop: 10, background: "none", border: "none", fontFamily: 'Russo One', color: "pink" }}
        >
          {err}
        </h3>
      ))}
    </div>
  );
}

export default Outfit;