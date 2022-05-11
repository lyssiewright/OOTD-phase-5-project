import React, { useEffect, useState } from "react";
import Outfit from "./Outfit";
import Friends from "./Friends";
import Header from "./Header";
import {useLocation} from "react-router-dom"

function Profile({ user }) {
    const [newTop, setNewTop] = useState('')
    const [newBottom, setNewBottom] = useState('')
    const [shuffleOutfitName, setShuffleOutfitName] = useState('')
    const [followers, setFollowers] = useState(user.followers)
    const [followees, setFollowees] = useState(user.followees)
    const [outfits, setOutfits] = useState([])


    // function handleShuffleSubmit(e){
    //     e.preventDefault()
    //     const formData = new FormData();
    //     formData.append('outfit', shuffleOutfitName)
    //     formData.append('top_img', newTop)
    //     formData.append('bottom_img', newBottom)
    //     formData.append('user_id', user.id)
    //     fetch('/outfits', {
    //         method: 'POST',
    //         body: formData
    //     })
        
    // }

    useEffect(() => {
        fetch('/outfits')
        .then(res => res.json())
        .then(data => setOutfits(data))
    }, [])
    

        const mappedOutfits = outfits.map((outfit)=> (
        <Outfit key={outfit.id} outfit={outfit}/>))
            

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
        position: "relative",
        textAlign: "center",
        display: "flex",
        width: "85%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundImage: `url(${user.theme})`, 
        // backgroundPosition: 'center',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        height: "100%",
        lineHeight: .5,

      }}>
        <div className="profile-info"
            style={{
                
            }}>
        <h1 style={{fontSize: 40}}>{user.name}'s Closet</h1>
        </div>
      <div className="profile-info-side">
        <h2 style={{fontSize: 30, textShadow: "-1px 2px 0 coral", color:"white"}}>My Profile Info</h2>
        <p style={{fontStyle: "italic"}}>Bio: {user.bio}</p>
        <span style={{
            textShadow: "-1px 2px 0 coral", 
            color:"white",
            fontSize: 12,
            display: "block"}}>
        <h3>Followers: {followers.length == 0 ? "No Followers  " : followers.length}</h3>
        <h3>Following: {followees.length == 0 ? "Not Following any users  " : followees.length}</h3>
        </span>
        <br></br>
        <div style={{
            backgroundColor: "white",
            width: "80%",
            height: "75%",
            marginLeft: 30,
            padding: 10
            }}>
        <h3>Random OOTD?</h3>
        <h3> 🔀 Mix it up ↓</h3>
        <button style={{ background: "pink", border: "none", fontFamily: 'Russo One', color: "white"}} onClick={shuffleTop}>Shuffle Top</button>
        <button style={{ background: "pink", border: "none", fontFamily: 'Russo One', color: "white"}}onClick={shuffleBottom}>Shuffle Bottom</button>
        
        {/* <form className="shuffle-form" onSubmit={handleShuffleSubmit}> */}
        {/* <label htmlFor="outfitName">Outfit Name</label> */}
        {/* <input type="text" id="outfitName" value={shuffleOutfitName} onChange={(e) => setShuffleOutfitName(e.target.value)}/> */}
        <img style={{
           height: 250,
           width: "auto",
       }} src={newTop}/>
        <img style={{
           height: 250,
           width: "auto",
       }} src={newBottom}/>
       </div>
        {/* <label htmlFor="shuffleTop">Shuffled Top</label> */}
        {/* <input type="text" id="shuffledTop" value={newTop} onChange={(e) => setNewTop(e.target.files[0])}/> */}
        {/* <label htmlFor="shuffleBottom">Shuffled Bottom</label> */}
        {/* <input type="text" id="shuffledBottom" value={newBottom} onChange={(e) => setNewBottom(e.target.files[0])}/> */}
        {/* <input type='submit'/> */}
      {/* </form> */}
      </div>
      <div> 
          {mappedOutfits}
      </div>
    </div>
  );
}

export default Profile;