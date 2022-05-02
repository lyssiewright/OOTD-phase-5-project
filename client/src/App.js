import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import ProfileSettings from "./ProfileSettings";


function App() {
  const [user, setUser] = useState("");
  const [outfits, setOutfits] = useState([])

  useEffect(() => {
    fetch('/outfits')
    .then(res => res.json())
    .then(data => setOutfits(data))
}, [])


  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogout() {
    setUser("");
  }

  function updateUser(newName, newBio, newTheme, newUsername) {
    setUser({ ...user, username: newUsername, name: newName, bio: newBio, theme: newTheme });
  }

  if (!user)
  return (
    <div>
      <div>
        <Header user={user} onLogout={handleLogout} />
        <Login onLogin={setUser} />
      </div>
      <Footer></Footer>
    </div>
  );

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/profile"
          element={
            <Profile
              user={user} outfits={outfits}
            />
          }
        />
        <Route exact path="/settings" 
          element={
          <ProfileSettings 
          user={user} handleLogout={handleLogout}
          updateUser={updateUser} />}/>
      </Routes>
      <Footer></Footer>
      </div>
  );
}

export default App;
