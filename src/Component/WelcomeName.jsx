import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import './WelcomeName.css';

export const WelcomeName = () => {
    const { instance } = useMsal();
    const [username, setUsername] = useState('');
    useEffect(() => {
        const currentAccount = instance.getActiveAccount();
        if(currentAccount){
            setUsername(currentAccount.username);
        }
    }, [instance]);
    return (
        <>
            <p className="userName">{username}</p>
        </>
    )
};
