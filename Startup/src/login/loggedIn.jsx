import React from 'react';

export function LoggedIn(props){
    const [username, setUsername] = React.useState(props.username);


    return(
    <div>
        <h2 className="textbox"><span>Welcome </span>{username}</h2>

        <h3 className="textbox">Characters:</h3>



    </div>
)}