import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Outfit from "./Outfit";


function FriendProfile() {
    const [friendOutfits, setFriendOutfits] = useState([])

    let {id} = useParams();
    let {username} = useParams();
    console.log(username)

    useEffect(() => {
        fetch(`/outfits/${username}/${id}`)
        .then(res => res.json())
        .then(data => setFriendOutfits(data))
    }, [])


    const mappedOutfits = friendOutfits.map((outfit)=> 
         <Outfit key={outfit.id} outfit={outfit}/>)

         
  return (
      <div style={{display: "flex", flexDirection:"column", alignItems: "center"}} className="container">
          <h2 style={{fontSize: 30, }}>{username}'s Closet</h2>
          <div style={{
              width: "fit-content"
          }}>
          {mappedOutfits}
          </div>
        </div>
  )
}

export default FriendProfile;