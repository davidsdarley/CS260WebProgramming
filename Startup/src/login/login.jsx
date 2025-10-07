import React from 'react';

export function Login() {
  return (
    <main>
      <section class = "textbox">
        <h2>Login</h2>
          <form method = "get" action = "charSheet.html">
            <div>
              <span>Username </span>
              <input type = "text" placeholder="your username here"/>
            </div>
            <div>
              <span>Password </span>
              <input type = "password" placeholder="your password here"/>
            </div>
            
            <button type="submit">Login</button>  
            <button type="submit">Create</button>
          </form>
      </section>

    </main>
  );
}