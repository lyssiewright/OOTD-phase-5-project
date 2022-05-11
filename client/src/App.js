import React, { useEffect, useState } from "react";
import { Routes, Route, useResolvedPath } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import ProfileSettings from "./ProfileSettings";
import Friends from "./Friends";
import FriendProfile from "./FriendProfile";
import Search from "./Search";
import ReactPlayer from "react-player";
import backgroundVideo from "./resources/ezgif-5-76bcba548c.mp4";
import NewOutfitForm from "./NewOutfitForm";


function App() {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([])
  // const [outfits, setOutfits] = useState([])
  const [follows, setFollows] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [friend, setFriend] = useState({})

//   useEffect(() => {
//     fetch('/outfits')
//     .then(res => res.json())
//     .then(data => setOutfits(data))
// }, [])

useEffect(() => {
  fetch('/users')
  .then(res => res.json())
  .then(data => setUsers(data))
}, [])

useEffect(() => {
  fetch(`/follows/${user.id}`)
  .then(res => res.json())
  .then(data => setFollows(data))
}, [])

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleSearch(newSearchQuery){
    setSearchQuery(newSearchQuery)
    users.map((user)=> {
      if (user.name.includes(searchQuery)){
        setFilteredName(user.name)
        setFriend(user)
      }
    })
  }

  function handleLogout() {
    setUser("");
  }

  function updateUser(newName, newBio, newTheme, newUsername) {
    setUser({ ...user, username: newUsername, name: newName, bio: newBio, theme: newTheme });
  }

  if (!user)
  return (
      <div className="video-wrapper">
      <ReactPlayer className="my-video" url={backgroundVideo} playing loop muted width="100%" height="100%"/>
      <div className="header-login">
        <Header user={user} onLogout={handleLogout} />
        <Login onLogin={setUser} />
      </div>
      {/* <Footer></Footer> */}
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
              user={user} />}
              // outfits={outfits}/>}
        />
        <Route exact path = "/new-outfit-form" element={<NewOutfitForm user={user}/>}/>
        <Route exact path="/settings" 
          element={
          <ProfileSettings 
          user={user} handleLogout={handleLogout}
          updateUser={updateUser} />}/>
        <Route exact path="/friends" 
          element={
          <Friends user={user}/>}/>
        <Route exact path="friend/:id" 
          element={
          <FriendProfile/>}/>
        <Route exact path="/search" 
          element={
          <Search filteredName={filteredName} follows={follows} user ={user} friend={friend} handleSearch={handleSearch}/>}/>
      </Routes>
      <Footer></Footer>
      </div>
  );
}

export default App;
