import React from "react";
import { Link } from "react-router-dom";


function Header({ user, onLogout }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }
  return (
    <div>
        <h1>ootd</h1>
      {/* <img
        style={{
          display: "block",
          margin: "auto",
          marginTop: 25,
          width: "30%",
        }}
        src={logo}
        alt="ootd" */}
      {/* /> */}
      {user ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            margin: 10,
          }}
        >
          <Link
            to={"/login"}
            onClick={handleLogout}
            style={{ display: "block", margin: "auto", marginRight: 0 }}
          >
            Logout
          </Link>
          <Link to={"profile"} style={{ display: "block", margin: "auto" }}>
            Profile
          </Link>
          <Link to={"settings"} style={{ display: "block", margin: "auto" }}>
            Profile Settings
          </Link>

          <p
            style={{
              display: "block",
              margin: "auto",
              marginLeft: 0,
            }}
          >
            Welcome!
          </p>

        </div>
      ) : (
        <h1
          style={{
            display: "block",
            margin: "auto",
            marginTop: 50,
            marginBottom: 50,
            width: "fit-content",
          }}
        >
          Log in, honey!
        </h1>
      )}
    </div>
  );
}

export default Header;