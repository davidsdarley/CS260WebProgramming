import React from 'react';
import { MessageBox } from './messageBox';

export function UnAuthorized( {onLogin} ) {
    
    const [enteredUsername, setUsername] = React.useState("");
    const [enteredPassword, setPassword] = React.useState("");
    const [displayError, setDisplayError] = React.useState(null);
    const [exampleUser, setUserData] = React.useState({
        "userID":1, "characters":[{"Dannic": 1}], "campaigns": [{"life before death":1}]
    })

    async function loginUser(){
        loginOrCreate(`/api/auth/login`)
    }
    async function createUser(){
        loginOrCreate(`/api/auth/create`)
    }

    async function loginOrCreate(endpoint){
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: enteredUsername, password: enteredPassword }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        if (response?.status === 200){ //this is really cool syntax I didn't know was possible until looking at simon. Nice!
            localStorage.setItem('username', enteredUsername);
            localStorage.setItem('charIDs', response.body.charIDs); 
            onLogin(enteredUsername, exampleUser);
        }
        else{
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
            
        }
    }

    return(
        <section className = "textbox">
        <h2>Login</h2>

            <div>
              <span>Username </span>
              <input
                type = "text" 
                placeholder="your username here"
                value={enteredUsername}
                onChange= {(e) => setUsername(e.target.value)}
               />
            </div>
            <div>
              <span>Password </span>
              <input 
                type = "password" 
                placeholder="your password here"
                value={enteredPassword}
                onChange= {(e) => setPassword(e.target.value)}
                />
            </div>
            
            <button onClick={() => loginUser()}>Login</button>  
            <button onClick={() => createUser()}>Create</button>  
        <MessageBox message={displayError} onHide={() => setDisplayError(null)}></MessageBox>
      </section>
    )
}
