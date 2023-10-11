import { useRouter } from 'next/router'

export const Page = () => {
    const router = useRouter();

    if(router.query.verificationToken) return <h1>We're verifying your account</h1>
    
    return (
        <h1>Please verify your account and come back</h1>
    );
}