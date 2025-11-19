import React from 'react';
import { Characters } from './characters';

export function LoggedIn({ username, onLogout = () => {} }){

    async function logoutUser(){
        fetch(`/api/auth/logout`, {
            method: 'delete',
          })
          .catch(() => {
          })
          .finally(()=> {
            const entries =["username", "character", "charID", "editMode"];
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

        <h1> Characters:</h1>
        <Characters></Characters>
        <br/>
        <button onClick={() => logoutUser()}>Logout</button>  


    </div>
)}