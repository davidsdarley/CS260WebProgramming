import React from 'react';
import { UnAuthorized } from './unAuthorized';
import { LoggedIn } from './loggedIn';
import { AuthState } from './authState';


export function Login({ username, authState, userData, authChange = () => {}}) {
  return (
    <main>
      <div>

      {authState === AuthState.Authenticated &&(
        <LoggedIn
          username={username}
          onLogout={() => {
            authChange("", AuthState.Unauthenticated, {});
            localStorage.removeItem("character");
          }}
          />
      )}
      {authState === AuthState.Unauthenticated && (
        <UnAuthorized
          onLogin={(loginUsername, foundUser) => {
            authChange(loginUsername, AuthState.Authenticated, foundUser);
          }}
        />
      )
      }
      
      </div>
    </main>
  );
}