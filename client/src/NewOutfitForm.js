import React, { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom"


function NewOutfitForm({ user, updateOutfits }) {
    const [outfitName, setOutfitName] = useState('')
    const [bottomImg, setBottomImg] = useState(null)
    const [topImg, setTopImg] = useState(null)
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append('outfit', outfitName)
        formData.append('top_img', topImg)
        formData.append('bottom_img', bottomImg)
        formData.append('user_id', user.id)
        fetch('/outfits', {
            method: 'POST',
            body: formData})
            .then((r)=>r.json())
            .then((data)=> updateOutfits(data))

        navigate("/profile")
        
    }
      

  return ( 
    <div>
        <form style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          margin: "auto",
          lineHeight: 2,
          boxShadow: "0.7em 1em 3em 0 pink", 
          borderColor: "pink",
          padding: 20,
          marginTop: 20
        }} className="upload-clothes-form" onSubmit={handleSubmit}>
            <label htmlFor="outfitName">Outfit Name</label>
            <input type="text" id="outfitName" value={outfitName} onChange={(e) => setOutfitName(e.target.value)}/>
            <input
                type="file"
                accept="image/*" onChange={(e) => setTopImg(e.target.files[0])}/>
            <input
                type="file"
                accept="image/*" onChange={(e) => setBottomImg(e.target.files[0])}/>

            <input style={{ background: "white", border: "none", fontFamily: 'Russo One', color: "pink"}} type='submit'/>
        </form>
    </div>
  );
}

export default NewOutfitForm;