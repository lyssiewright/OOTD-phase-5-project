import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectTheme from "./SelectTheme";
import Outfit from "./Outfit";


function Profile({ user, outfits }) {
    const [outfitName, setOutfitName] = useState('')
    const [bottomImg, setBottomImg] = useState(null)
    const [topImg, setTopImg] = useState(null)
    const [newTop, setNewTop] = useState('')
    const [newBottom, setnewBottom] = useState('')



    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append('outfit', outfitName)
        formData.append('top_img', topImg)
        formData.append('bottom_img', bottomImg)
        formData.append('user_id', user.id)
        fetch('/outfits', {
            method: 'POST',
            body: formData
        })
        
    }
    
    // function handleNewSubmit(e){
    //     e.preventDefault()
    //     const formData = new FormData();
    //     formData.append('outfit', shuffledOutfitName)
    //     formData.append('top_img', newTop)
    //     formData.append('bottom_img', newBottom)
    //     formData.append('user_id', user.id)
    //     fetch('/outfits', {
    //         method: 'POST',
    //         body: formData
    //     })
        
    // }
    

        const mappedOutfits = outfits.map((outfit)=> 
        <Outfit key={outfit.id} outfit={outfit}/>
        
    )


        function shuffleTop(){
        let currentIndex = outfits.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = outfits[currentIndex];
          outfits[currentIndex] = outfits[randomIndex];
          outfits[randomIndex] = temporaryValue;
        }
        setNewTop(outfits[0].top_img);
      }

      function shuffleBottom(){
        let currentIndex = outfits.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = outfits[currentIndex];
          outfits[currentIndex] = outfits[randomIndex];
          outfits[randomIndex] = temporaryValue;
        }
        setnewBottom(outfits[0].bottom_img);
      }
      
        

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="outfitName">Outfit Name</label>
        <input type="text" id="outfitName" value={outfitName} onChange={(e) => setOutfitName(e.target.value)}/>
        <input
            type="file"
            accept="image/*" onChange={(e) => setTopImg(e.target.files[0])}/>
        <label htmlFor="bottomName">Name of the bottom</label>
        <input
            type="file"
            accept="image/*" onChange={(e) => setBottomImg(e.target.files[0])}/>

        <input type='submit'/>
      </form>
      <button onClick={shuffleTop}>Shuffle Top</button>
      <button onClick={shuffleBottom}>Shuffle Bottom</button>
      <div>
        <img src={newTop}/>
        <img src={newBottom}/>
 
      </div>
      <div>
          {/* {mappedOutfits} */}
      </div>
    </div>
  );
}

export default Profile;