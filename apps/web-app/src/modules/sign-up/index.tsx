import { useAuth } from '@contexts';

export const Page = () => {
    const { googleSignIn, credentialsSignUp } = useAuth();

    return (
        <>
            <h1>Sign Up</h1>
            <button onClick={googleSignIn.mutate}>Google</button>
            <button onClick={() => credentialsSignUp.mutate({ email: 'iago123@email.com', password: '1234', confirmPassword: '1234', name: 'iago' })}>Credentials</button>
        </>
    );
}