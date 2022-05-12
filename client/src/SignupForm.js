import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectTheme from "./SelectTheme"
import splatter_paint from "./resources/splatter_paint.png";


function SignUpForm({ onLogin, user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [theme, setTheme] = useState(splatter_paint)
  const [name, setName] = useState("")
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/profile");
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        password,
        bio,
        theme
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          margin: "auto",
          lineHeight: 2
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="bio">Tell us a little about yourself!</label>
        <input
        style={{
            height: 60
        }}
          type="text"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="theme">Select your closet</label>
        <select
          type="text"
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          autoComplete="off"
        >
          <SelectTheme />
        </select>
        <button type="submit" style={{ 
          marginTop: 20, 
          background: "none", 
          border: "none", 
          fontFamily: 'Russo One', 
          color: "pink",
          fontSize: 24
          }}>
          {isLoading ? "Loading..." : "Sign Up!!"}
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
      <br />

    </div>
  );
}

export default SignUpForm;