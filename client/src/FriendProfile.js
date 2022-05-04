import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Outfit from "./Outfit";


function FriendProfile() {
    const [friendOutfits, setFriendOutfits] = useState([])

    let {id} = useParams();

    useEffect(() => {
        fetch(`/outfits/${id}`)
        .then(res => res.json())
        .then(data => setFriendOutfits(data))
    }, [])


    const mappedOutfits = friendOutfits.map((outfit)=> 
         <Outfit key={outfit.id} outfit={outfit}/>)

  return (
      <div>
          {mappedOutfits}
      </div>
  )
}

export default FriendProfile;