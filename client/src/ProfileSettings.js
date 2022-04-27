import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectTheme from "./SelectTheme";


function ProfileSettings({ user, handleLogout, updateUser }) {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [theme, setTheme] = useState(user.theme)
  const [justToBeSure, setJustToBeSure] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  console.log(user.theme)

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
        theme: theme
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          updateUser(username, bio, theme);
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
        border: "1px solid red",
        backgroundColor: "transparent",
        width: "fit-content",
        display: "block",
        margin: "auto",
      }}
    >
      <h1 style={{ margin: 20 }}>Are you sure you want to delete this user?</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <button
          style={{
            display: "block",
            margin: "auto",
            marginBottom: 20,
            backgroundColor: "transparent",
            borderColor: "red",
            width: "fit-content",
            height: "fit-content",
            fontSize: 36,
          }}
          onClick={() => setJustToBeSure(false)}
        >
          Cancel
        </button>
        <button
          style={{
            display: "block",
            margin: "auto",
            marginBottom: 20,
            backgroundColor: "transparent",
            color: "red",
            borderColor: "red",
            width: "fit-content",
            height: "fit-content",
            fontSize: 36,
          }}
          onClick={deleteUser}
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <div style={{
        backgroundImage: `url(${theme})`, 
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: 700
        }}>
      <div>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "33%",
          margin: "auto",
        }}
      >
        <label htmlFor="username">Change Username</label>
        <input
          type="username"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="bio">Change Bio</label>
        <input style={{height: 60}}
          type="bio"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="theme">Change Theme</label>
        <select
          type="theme"
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <SelectTheme />
        </select>
        <button type="submit" style={{ marginTop: 10 }}>
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
      </form>
      <button
        onClick={areYouSure}
        style={{
          backgroundColor: "transparent",
          color: "red",
          borderColor: "red",
          width: "fit-content",
          height: "fit-content",
          fontSize: 36,
          margin: "auto",
          marginTop: 20,
          marginBottom: 20,
          display: "block",
        }}
      >
        Delete User
      </button>
    </div>
  );
}

export default ProfileSettings;