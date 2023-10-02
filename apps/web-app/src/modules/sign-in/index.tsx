import { useAuth } from '@contexts';

export const Page = () => {
    const { googleSignIn, credentialsSignIn } = useAuth();

    return (
        <>
            <h1>Sign In</h1>
            <button onClick={googleSignIn.mutate}>Google</button>
            <button onClick={credentialsSignIn.mutate}>Credentials</button>
        </>
    );
}