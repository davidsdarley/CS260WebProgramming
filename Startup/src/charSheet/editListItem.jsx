import React from 'react';
import './charSheet.css';

export function EditListItem( { input, remove = () => {} }){
    return(
        
        <li>
            <span>{input}</span><button onClick={remove}>Remove</button>
        </li>
    );
}