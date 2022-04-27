import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectTheme from "./SelectTheme";
import Outfit from "./Outfit";


function Profile({ user }) {

    // const [files, setFiles] = useState([])
    const [topName, setTopName] = useState('')
    const [bottomName, setBottomName] = useState('')
    const [bottomImg, setBottomImg] = useState(null)
    const [topImg, setTopImg] = useState(null)
    const [outfits, setOutfits] = useState([])

    useEffect(() => {
        fetch('/outfits')
        .then(res => res.json())
        .then(data => setOutfits(data))
    }, [])

    function handleImageSubmit(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append('top', topName)
        formData.append('bottom', bottomName)
        formData.append('top_img', topImg)
        formData.append('bottom_img', bottomImg)
        // for (let i = 0; i < files.length; i++){
        //     formData.append('images[]', files[i])
        // }


        fetch('/outfits', {
            method: 'POST',
            body: formData
        })
    }

    const mappedOutfits = outfits.map((outfit)=>  
        <Outfit key={outfit.id} outfit={outfit} />
        
    ) 

    
    

  return (
    <div style={{
        backgroundImage: `url(${user.theme})`, 
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: 600
      }}>
        <h1>{user.name}'s Closet</h1>
        <p>{user.bio}</p>
    
      <form onSubmit={handleImageSubmit}>
        <label htmlFor="topName">Name of the top</label>
        <input type="text" id="topName" value={topName} onChange={(e) => setTopName(e.target.value)}/>
        <input
            type="file"
            accept="image/*" onChange={(e) => setTopImg(e.target.files[0])}/>
        <label htmlFor="bottomName">Name of the bottom</label>
        <input type="text" id="bottomName" value={bottomName} onChange={(e) => setBottomName(e.target.value)}/>
        <input
            type="file"
            accept="image/*" onChange={(e) => setBottomImg(e.target.files[0])}/>
        <input type='submit'/>
      </form>
      <div>
          {mappedOutfits}
      </div>
    </div>
  );
}

export default Profile;