import React from 'react';
import { Characters } from './characters';

export function LoggedIn({ username, onLogout = () => {} }){
    console.log("LoggedIn called")

    async function logoutUser(){
        console.log("Logout called");

        fetch(`/api/auth/logout`, {
            method: 'delete',
          })
          .catch(() => {
          })
          .finally(()=> {
            const entries =["username", "character", "charID"];
            entries.forEach((item)=>{
              localStorage.removeItem(item);
            });
            onLogout();
          });    
    }


    return(
    <div>
        <br/>
        <h2 className="spacing"><span>Welcome </span>{username}</h2>

        <h3 className="textbox">Characters:</h3>
        <Characters></Characters>
        <br/>
        <button onClick={() => logoutUser()}>Logout</button>  


    </div>
)}