import React, { useState } from "react";
import { Link } from "react-router-dom";
import hanger from "./resources/hanger.png"

function Header({ user, onLogout }) {
    const [width, setWidth] = useState(0)

    function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
    }



    function openNav(){
        setWidth(270)
        return width
    }

    function closeNav(){
        setWidth(0)
        return width
    }


  return (
    <div>
        <div style={{
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            lineHeight: .1,
            width: "88%"
            }}>
        <h1 style={{
            fontSize: "80px",
        }}>#OOTD</h1>
      <img
        style={{
          display: "block",
          width: "10%",
          height: "10%",
        }}
        src={hanger}/>
        </div>
      {user ? (
        <div>
        <button style={{
            background: "none", 
            border: "none", 
            fontFamily: 'Russo One', 
            color: "pink", 
            fontSize: 65,
            lineHeight: .1}} 
            onMouseOver={()=>openNav()}>≡</button>
            <div id="my-side-nav" className="side-nav" style={{width: width}}>
            <a href="javascript:void(0)" className="closebtn" onClick={()=>closeNav()}>&times;</a>
            <p
            style={{
                fontSize: 35
            }}
          >
            Welcome!
          </p>
          <Link
            className="nav"
            to={"/login"}
            onClick={handleLogout}
            style={{ display: "block", margin: "auto", marginRight: 0 }}
          >
            Logout
          </Link>
          <Link className="nav" to={"profile"}>
            Profile
          </Link>
          <Link className="nav" to={"friends"}>
            Friends
          </Link>
          <Link className="nav" to={"settings"}>
            Profile Settings
          </Link>
          <Link className="nav" to={"search"}>
            Search Users
          </Link>
          <Link className="nav" to={"new-outfit-form"}>
            + Add a new fit!
          </Link>

        </div>
        </div>
        
      ) : (
        <h2
          style={{
            display: "block",
            margin: "auto",
            marginTop: 30,
            marginBottom: 50,
            width: "fit-content",
            fontSize: 40
          }}
        >
          Log in, honey!
        </h2>
      )}
    </div>
  );
}

export default Header;