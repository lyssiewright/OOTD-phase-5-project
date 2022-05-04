import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FriendProfile from "./FriendProfile";

function Friends({user}) {

  const followers = user.followers
  const mappedFollowers = followers.map(follower => <ul> {follower.username} <Link to={`/friend/${follower.id}`}>See Profile</Link></ul>)
  const followees = user.followees
  const mappedFollowees = followees.map(followee => <ul>{followee.username} <Link to={`/friend/${followee.id}`}>See Profile</Link></ul>)
    // const mappedFollows = follows.map(follow => 
    //    <FriendProfile key={follow.id} follow={follow}/>)

  return (
      <div>
      <h3>Followers:</h3>
        {mappedFollowers}
      <h3>Following:</h3>
        {mappedFollowees}
      </div>
  )
}

export default Friends;