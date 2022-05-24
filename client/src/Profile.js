import React, { useEffect, useState } from "react";
import Outfit from "./Outfit";


function Profile({onDeleteOutfit}) {
    const [newTop, setNewTop] = useState('')
    const [newBottom, setNewBottom] = useState('')
    const [outfits, setOutfits] = useState([])
    const [user, setUser] = useState("");

    useEffect(() => {
        fetch("/me").then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user));
          }
        });
      }, []);


    useEffect(() => {
        fetch('/outfits')
        .then(res => res.json())
        .then(data => setOutfits(data))
    }, [])

    

        function onDeleteOutfit(deletedOutfit){
            const updatedOutfits = mappedOutfits.filter((outfit)=>outfit.id !== deletedOutfit)
            setOutfits(updatedOutfits)
        }


        const mappedOutfits = outfits.map((outfit)=> (
            <Outfit key={outfit.id} outfit={outfit} onDeleteOutfit={onDeleteOutfit}/>))
            

        function shuffleTop(e){
        e.stopPropagation();
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
      

      function shuffleBottom(e){
        e.stopPropagation();
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


    if (user.followees && user.followers){
  return ( 
    <div style={{
        position: "relative",
        textAlign: "center",
        display: "flex",
        width: "90%",
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
        <p style={{fontStyle: "italic", color: "white", backgroundColor: "pink", lineHeight: 1, display: "inline-flex", alignContent: "center", width: "95%"}}>Bio: {user.bio}</p>
        <span style={{
            textShadow: "-1px 2px 0 coral", 
            color:"white",
            fontSize: 12,
            display: "inline-flex"
            }}>
        <h3 style={{marginInline: 10 }}>Followers: {user.followers.length ? user.followers.length : "No Followers  "  }</h3>
        <h3>Following: {user.followees.length ? user.followees.length : "Not Following any users  "}</h3>
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
        <button style={{ marginInline: 10, background: "pink", border: "none", fontFamily: 'Russo One', color: "white"}} onClick={(e)=>shuffleTop(e)}>Shuffle Top</button>
        <button style={{ background: "pink", border: "none", fontFamily: 'Russo One', color: "white"}}onClick={(e)=>shuffleBottom(e)}>Shuffle Bottom</button>
        
        {/* <form className="shuffle-form" onSubmit={handleShuffleSubmit}> */}
        {/* <label htmlFor="outfitName">Outfit Name</label> */}
        {/* <input type="text" id="outfitName" value={shuffleOutfitName} onChange={(e) => setShuffleOutfitName(e.target.value)}/> */}
        <img style={{
           height: 250,
           width: "auto",
           marginTop: 10,
           marginBottom: 10
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
  );}
  else {
    return(
    <div>
      <h1>Loading...</h1>
     </div>
    )}
}

export default Profile;