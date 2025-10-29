import React from 'react';
import { UnAuthorized } from './unAuthorized';
import { LoggedIn } from './loggedIn';
import { AuthState } from './authState';


export function Login({ username, authState, userData, authChange = () => {}}) {
  console.log("Login.jsx called", username, authState, userData);

  return (
    <main>
      <div>

      {authState === AuthState.Authenticated &&(
        <LoggedIn
          username={username}
          onLogout={() => {
            console.log("onLogout called");
            authChange("", AuthState.Unauthenticated, {});
            localStorage.removeItem("character");
            console.log("Logged out", authState);
          }}
          />
      )}
      {authState === AuthState.Unauthenticated && (
        <UnAuthorized
          onLogin={(loginUsername, foundUser) => {
            console.log("onLogin called");
            authChange(loginUsername, AuthState.Authenticated, foundUser);
            console.log("Login finished",authState);
          }}
        />
      )
      }
      
      </div>
    </main>
  );
}