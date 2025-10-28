import React from 'react';

export function LoggedIn({ username, onLogout = () => {} }){
    console.log("LoggedIn called")

    async function logoutUser(){
        console.log("Logout called");
        localStorage.removeItem('username');
        onLogout();
    }

    return(
    <div>
        <br/>
        <h2 className="spacing"><span>Welcome </span>{username}</h2>

        <h3 className="textbox">Characters:</h3>

        <br/>
        <button onClick={() => logoutUser()}>Logout</button>  


    </div>
)}