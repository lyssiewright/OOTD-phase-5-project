import React, { useEffect, useState } from "react";
import { useLinkClickHandler } from "react-router-dom";
import { Link } from "react-router-dom";
import FriendProfile from "./FriendProfile";

function Friends({user}) {

  const followers = user.followers
  const mappedFollowers = followers.map(follower => <ul> {follower.username} <Link style={{color: "lightcoral"}} to={`/friend/${follower.id}`}>See Profile</Link></ul>)
  const followees = user.followees
  const mappedFollowees = followees.map(followee => <ul>{followee.username} <Link style={{color: "lightcoral"}} to={`/friend/${followee.id}`}>See Profile</Link></ul>)


  return (
      <div style={{
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        width: "40%",
        height: "fit-content",
        margin: "auto",
        lineHeight: .3,
        padding: 20,
        backgroundColor: "white",
        boxShadow: "0.7em 1em 3em 0 pink",
        borderColor: "pink"}}>
      <h3 style={{fontSize:30}}>Followers:</h3>
        {mappedFollowers}
      <h3 style={{fontSize:30}}>Following:</h3>
        {mappedFollowees}
      </div>
  )
}

export default Friends;