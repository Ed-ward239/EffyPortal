import { useMsal } from '@azure/msal-react';

const SignOutBtn = () => {
    const { instance } = useMsal();
    const handleSignOut = () => {
        instance.logoutRedirect();
    }
    return (
        <button onClick={handleSignOut}>Log out</button>
    )
}
export default SignOutBtn;