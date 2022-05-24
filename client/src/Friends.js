import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Friends() {
  const [user, setUser] = useState("");

  useEffect(() => {
      fetch("/me").then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
    }, []);


  
  // const followers = user.followers
  // const mappedFollowers = followers.map(follower => <ul> {follower.username} <Link style={{color: "lightcoral"}} to={`/friend/${follower.username}/${follower.id}`}>See Profile</Link></ul>)
  // const followees = user.followees
  // const mappedFollowees = followees.map(followee => <ul>{followee.username} <Link style={{color: "lightcoral"}} to={`/friend/${followee.username}/${followee.id}`}>See Profile</Link></ul>)

if (user.followers && user.followees){
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
        {/* {mappedFollowers} */}
        {user.followers.map(follower => <ul> {follower.username} <Link style={{color: "lightcoral"}} to={`/friend/${follower.username}/${follower.id}`}>See Profile</Link></ul>)}

      <h3 style={{fontSize:30}}>Following:</h3>
        {/* {mappedFollowees} */}
        {user.followees.map(followee => <ul>{followee.username} <Link style={{color: "lightcoral"}} to={`/friend/${followee.username}/${followee.id}`}>See Profile</Link></ul>)}
      </div>
  )}
  else {
    return (
      <h2>Loading...</h2>
    )
  }
}

export default Friends;