import { useMsal } from '@azure/msal-react';

const SignOutBtn = () => {
    const { instance } = useMsal();
    const handleSignOut = () => {
        instance.logoutRedirect('/');
    }
    return (
        <p onClick={handleSignOut}>Log out</p>
    )
}
export default SignOutBtn;