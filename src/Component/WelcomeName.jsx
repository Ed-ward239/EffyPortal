import React from 'react';
import './WelcomeName.css';
import { useUsername } from './useUsername';

function WelcomeName() {
    const capitalName = useUsername();
    return (
        <p className="userName">{capitalName}</p>
    );
}

export default WelcomeName;