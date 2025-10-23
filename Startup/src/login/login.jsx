import React from 'react';
import { UnAuthorized } from './unAuthorized';
import { LoggedIn } from './loggedIn';
import { AuthState } from './authState';



export function Login({ username, authState, userData, authChange  = () => {}}) {
  console.log("Login.jsx called", username, authState, userData);

  return (
    <main>
      {authState !== AuthState.Authenticated && (
        <UnAuthorized
          onLogin={(loginUsername, foundUser) => {
            console.log("onLogin called");
            authChange(loginUsername, AuthState.Authenticated, foundUser);
            console.log("Login finished",authState)
          }}
        />
      )
      }

      {authState === AuthState.Authenticated &&(
        <LoggedIn
          username={username}/>
      )}


      

    </main>
  );
}