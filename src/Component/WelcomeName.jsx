import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import './WelcomeName.css';

export const WelcomeName = () => {
    const { instance } = useMsal();
    const [username, setUsername] = useState('');
    const firstName = username.substring(0, username.indexOf("@"));
    const capitalName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    useEffect(() => {
        const currentAccount = instance.getActiveAccount();
        if(currentAccount){
            setUsername(currentAccount.username);
        }
    }, [instance]);

    return (
        <>
            <p className="userName">{capitalName}</p>
        </>
    )
};
