import React from 'react';

export function UnAuthorized( {onLogin} ) {
    
    const [enteredUsername, setUsername] = React.useState("");
    const [enteredPassword, setPassword] = React.useState("");
    const [exampleUser, setUserData] = React.useState({
        "userID":1, "characters":[{"Dannic": 1}], "campaigns": [{"life before death":1}]
    })
    

    async function loginUser(){
        console.log("Login called");
        localStorage.setItem('username', enteredUsername);
        onLogin(enteredUsername, exampleUser);
    }
    async function createUser(){
        console.log("Create called");
        localStorage.setItem('username', enteredUsername);
        onLogin(enteredUsername, exampleUser);

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

      </section>
    )
}
