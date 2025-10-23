import React from 'react';
import { UnAuthorized } from './unAuthorized';


export function Login({ username, authState, authChange }) {

  return (
    <main>
      {authState !== true && (
        <UnAuthorized
          onLogin={(loginUsername, foundUser) => {
            authChange(loginUsername, true, foundUser);
          }}
        />
      )
      }

      {authState === true &&(
        <p className = "textbox">USER INFO STUFF</p>
      )}


      

    </main>
  );
}