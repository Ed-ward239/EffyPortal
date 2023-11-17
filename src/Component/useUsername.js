import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";

export function useUsername() {
    const { instance } = useMsal();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const currentAccount = instance.getActiveAccount();
        if(currentAccount){
            setUsername(currentAccount.username);
        }
    }, [instance]);

    const firstName = username.substring(0, username.indexOf("@"));
    const capName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    return capName;
}