import { useAuth } from '@contexts';

export const Page = () => {
    const { googleSignUp } = useAuth();

    return (
        <>
            <h1>Sign Up</h1>
            <button onClick={googleSignUp.mutate}>Google</button>
        </>
    );
}