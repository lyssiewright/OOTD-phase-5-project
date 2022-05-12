import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectTheme from "./SelectTheme";


function ProfileSettings({ user, handleLogout, updateUser }) {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  // const [theme, setTheme] = useState(user.theme)
  const [justToBeSure, setJustToBeSure] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  console.log(user)


  function handleSubmit(e) {
    e.preventDefault();
    fetch("/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        bio: bio,
        // theme: theme
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          updateUser(username, bio);
          setErrors(["User was updated successfully"]);
          setTimeout(() => setErrors([]), 1500);
        });
      } else r.json().then((data) => setErrors(data.errors));
    })
        navigate("/profile");
  }

  function areYouSure() {
    setJustToBeSure(true);
  }

  function deleteUser() {
    fetch("/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    navigate("/login");
    handleLogout();
  }

  return justToBeSure ? (
    <div
      style={{
        border: "1px solid pink",
        backgroundColor: "white",
        width: "fit-content",
        display: "block",
        margin: "auto",
        boxShadow: "0.7em 1em 3em 0 pink", 
        marginTop: 60
      }}
    >
      <h1 style={{ margin: 20 }}>Delete your account?!</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <button
          style={{
            background: "pink",
            border: "none", 
            fontFamily: 'Russo One', 
            color: "white",
            display: "block",
            margin: "auto",
            marginBottom: 20,
            width: "fit-content",
            height: "fit-content",
            fontSize: 24,
          }}
          onClick={() => setJustToBeSure(false)}
        >
          As if!
        </button>
        <button
          style={{
            background: "coral",
            border: "none", 
            fontFamily: 'Russo One', 
            color: "white",
            display: "block",
            margin: "auto",
            marginBottom: 20,
            width: "fit-content",
            height: "fit-content",
            fontSize: 24,

          }}
          onClick={deleteUser}
        >
          Totally
        </button>
      </div>
    </div>
  ) : (
    // <div className="filtered" style={{
    //       backgroundImage: `url(${theme})`, 
    //       backgroundPosition: 'center',
    //       backgroundSize: "cover",
    //       backgroundRepeat: 'no-repeat',
    //       height: 700,
      <div>
      <form className="settings-form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "33%",
          margin: "auto",
          border: "1px solid pink",
          backgroundColor: "white",
          padding: 15,
          boxShadow: "0.7em 1em 3em 0 pink", 
          lineHeight: 2,
        }}
      >
        <label htmlFor="username">Change Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="bio">Change Bio</label>
        <input style={{height: 60}}
          type="text"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          autoComplete="off"
        />
        {/* <label htmlFor="theme">Change Color Scheme</label>
        <select
          type="theme"
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <SelectTheme />
        </select> */}
        <button type="submit" style={{ 
          
          marginTop: 10,
          background: "pink",
          border: "none", 
          fontFamily: 'Russo One', 
          color: "white",
          display: "block",
          fontSize: 20, 
            }}>
          Save Changes
        </button>
        {errors.map((err) => (
          <h3
            key={err}
            style={{
              display: "block",
              margin: "auto",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {err}
          </h3>
        ))}
              <button
        onClick={areYouSure}
        style={{
          background: "coral",
          border: "none", 
          fontFamily: 'Russo One', 
          color: "white",
          display: "block",
          margin: "auto",
          marginTop: 20,
          width: "fit-content",
          height: "fit-content",
          fontSize: 24,
        }}
      >
        Delete My Closet
      </button>
      </form>

    </div>
  );
}

export default ProfileSettings;