import React, { useEffect, useState } from "react";

function Search({handleSearch, filteredName, user, friend}) {
    const [isFollow, setIsFollow] = useState(false)
    const [follows, setFollows] = useState(user.followees)

    function onChange(e){
        handleSearch(e.target.value)
    }


 
    useEffect(() => {
            const foundFollowee = follows.find(element => element.name.includes(filteredName));
             if (foundFollowee !== undefined){
                 setIsFollow(true)
        }
    },[friend, user.followees])

    const isSame = user.id === friend.id ? true : false

    function renderFollow(){
        if (isSame) {
            return <h3>Me!</h3>
        }
        else if (isFollow) {
            return <button style={{
                background: "none", 
                borderColor: "pink", 
                fontFamily: 'Russo One', 
                color: "pink",
                fontSize: 12
            }} 
                onClick={(() => unfollow())}>Unfollow</button>
        } else {
            return <button style={{
                background: "pink", 
                borderColor: "white", 
                fontFamily: 'Russo One', 
                color: "white",
                fontSize: 12
            }} 
            onClick={(() => follow())}>Follow</button>
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
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        width: "25%",
        margin: "auto",
        marginTop: 40,
        boxShadow: "0.7em 1em 3em 0 pink", 
        borderColor: "pink",
        padding: 30,
        height: "fit-content"
    }}>
    <h3 style={{fontSize: 40}}>Search Users</h3>
    <input type="text" id="userSearch"
        placeholder="Enter user's name"
        onChange={onChange} />
    <div>{filteredName} {renderFollow}</div>
    </div>
  )}
  else {
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        width: "25%",
        margin: "auto",
        marginTop: 40,
        boxShadow: "0.7em 1em 3em 0 pink", 
        borderColor: "pink",
        padding: 30,
        height: "fit-content"
    }}>
    <h3 style={{fontSize: 40, marginTop: 15}}>Search Users</h3>
    <input type="text" id="userSearch"
        placeholder="Enter user's name"
        onChange={onChange} />
    <h3 style={{fontSize: 30, marginBottom: 0}}>Results</h3>
    <div style={{display: "flex", alignItems: "center"}}>
        <p style={{paddingRight: 10, fontSize:20}}>{filteredName}</p> 
        {renderFollow()}
    </div>
    </div>
  )}
}

export default Search;

