import React, { useEffect, useState } from "react";
import { useResolvedPath } from "react-router-dom";

function Search({handleSearch, filteredName, user, friend}) {
    const [isFollow, setIsFollow] = useState(false)
    const [follows, setFollows] = useState(user.followees)

    function onChange(e){
        handleSearch(e.target.value)
    }


 
    useEffect(() => {
            const foundFollowee = follows.find(element => element.name.includes(filteredName));
             if (foundFollowee === undefined){
                 setIsFollow(false)
        }
    },[friend, user.followees])

    const isSame = user.id === friend.id ? true : false

    function renderFollow(){
        if (isSame) {
            return <h3>Me!</h3>
        }
        else if (isFollow) {
            return <button onClick={(() => unfollow())}>Unfollow</button>
        } else {
            return <button onClick={(() => follow())}>Follow</button>
        }
    }

    function unfollow() {
        console.log(friend.id)
        fetch((`/follows/${friend.id}`),{
          method: 'DELETE'
        })
        .then(resp => {
          if (resp.ok) {
             setIsFollow(false)
          }
        })
      }

      function follow() {
          console.log("follow")
        fetch(`/follows/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ followee_id: friend.id, follower_id: user.id }),
        }).then((resp) => {
          if (resp.ok) {
             setIsFollow(true)
          }
        })
      }

    
        
        


  


if (filteredName === ""){
  return (
    <div>
    <h3>Search Users</h3>
    <input type="text" id="userSearch"
        placeholder="Enter user's name"
        onChange={onChange} />
    <div>{filteredName} {renderFollow}</div>
    </div>
  )}
  else {
  return (
    <div>
    <h3>Search Users</h3>
    <input type="text" id="userSearch"
        placeholder="Enter user's name"
        onChange={onChange} />
    {/* <div>{filteredName} <button onClick={handleAddFriend}>{isFollow ? "Follow" : "Unfollow"}</button></div> */}
    <div>{filteredName} 
    {renderFollow()}</div>
    </div>
  )}
}

export default Search;

