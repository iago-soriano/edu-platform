import { useAuth } from '@contexts';
import { 
    PasswordInput, 
    Input, 
    Form, 
    Footer, 
    FormButton, 
    ErrorAlert, 
    Heading,
    GoogleSignInButton,
    errorToast,
    SignInUpPageImage,
    SignInUpPageContainer,
    SignInUpFormContainer,
    Separator
} from '@components';
import { ForgotPassword } from './forgot-password';
import { signInSchema } from '@infrastructure';
import { useEffect } from 'react';

export const Page = () => {
    const { googleSignIn } = useAuth();

    const {
        credentialError,
        credentialOnSubmit,
        credentialLoading
    } = useCredentialSignIn();

    return (
        <>
            <SignInUpPageContainer>
                <SignInUpPageImage />
                <SignInUpFormContainer>
                    
                    <Heading>Entrar</Heading>
                    <GoogleSignInButton onClick={googleSignIn.mutate} />
                    <Separator>Ou</Separator>
                    {credentialError && <ErrorAlert>{credentialError}</ErrorAlert>}
                    <Form onSubmit={credentialOnSubmit} schema={signInSchema}>
                        <Input name='email' inputLabel={{ text: 'E-mail', mandatory: true }} placeholder='Digite aqui seu e-mail' type='email'/>
                        <PasswordInput 
                            name='password' 
                            inputLabel={{ text: 'Senha', mandatory: true }}    
                            placeholder='Digite aqui sua senha'                 
                        />
                        <ForgotPassword />
                        <FormButton label="Entrar" loading={credentialLoading}/>
                    </Form>
                </SignInUpFormContainer>
            </SignInUpPageContainer>
            <Footer />
        </>
    );
}

const useCredentialSignIn = () => {
    const { credentialsSignIn } = useAuth();
    const onSubmit = async ({ email, password }) => {
        try {
            credentialsSignIn.mutate({ email, password });
        } catch (e) {
            console.error({e})
        }
    }

    useEffect(() => {
        if(credentialsSignIn.error) {
            errorToast("Houve um erro");
        }
    }, [credentialsSignIn]);

    return {
        credentialError: credentialsSignIn.error?.message,
        credentialOnSubmit: onSubmit,
        credentialLoading: credentialsSignIn.isLoading
    }
}