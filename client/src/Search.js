import React, { useEffect, useState } from "react";

function Search() {



  return (
    <div>
    <h3>Search Users</h3>
    <input type="text" id="userSearch"
        placeholder="Enter user's name"
        
        onChange={(e)=>console.log(e.target.value)} />
    </div>
  )
}

export default Search;

