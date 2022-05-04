import React, { useEffect, useState } from "react";
import Outfit from "./Outfit";
import Friends from "./Friends";

function Profile({ user, outfits }) {
    const [outfitName, setOutfitName] = useState('')
    const [bottomImg, setBottomImg] = useState(null)
    const [topImg, setTopImg] = useState(null)
    const [newTop, setNewTop] = useState('')
    const [newBottom, setNewBottom] = useState('')
    const [shuffleOutfitName, setShuffleOutfitName] = useState('')
    const [followers, setFollowers] = useState(user.followers)
    const [followees, setFollowees] = useState(user.followees)

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

    function handleShuffleSubmit(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append('outfit', shuffleOutfitName)
        formData.append('top_img', newTop)
        formData.append('bottom_img', newBottom)
        formData.append('user_id', user.id)
        fetch('/outfits', {
            method: 'POST',
            body: formData
        })
        console.log(formData)
        
    }
    

        const mappedOutfits = outfits.map((outfit)=> (
        <Outfit key={outfit.id} outfit={outfit}/>))

        // const mappedFollowers = followers.map(follower => {
        // <Friends key={follower.id} follower={follower}/>})
        // const mappedFollowees = followees.map(followee => <ul>{followee.username}</ul>)
            

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
        setNewBottom(outfits[0].bottom_img);
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
        <h3>Followers: {followers.length == 0 ? "No Followers" : followers.length}</h3>
        <h3>Following: {followees.length == 0 ? "Not Following any users" : followees.length}</h3>
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
      <div>
      <button onClick={shuffleTop}>Shuffle Top</button>
      <button onClick={shuffleBottom}>Shuffle Bottom</button>
      </div>
      <form onSubmit={handleShuffleSubmit}>
        <label htmlFor="outfitName">Outfit Name</label>
        <input type="text" id="outfitName" value={shuffleOutfitName} onChange={(e) => setShuffleOutfitName(e.target.value)}/>
        <img style={{
           height: 300,
           width: "auto",
       }} src={newTop}/>
        <img style={{
           height: 300,
           width: "auto",
       }} src={newBottom}/>
        <label htmlFor="shuffleTop">Shuffled Top</label>
        <input type="text" id="shuffledTop" value={newTop} onChange={(e) => setNewTop(e.target.files[0])}/>
        <label htmlFor="shuffleBottom">Shuffled Bottom</label>
        <input type="text" id="shuffledBottom" value={newBottom} onChange={(e) => setNewBottom(e.target.files[0])}/>
        <input type='submit'/>
      </form>
      <div> 
          {mappedOutfits}
      </div>
    </div>
  );
}

export default Profile;