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
import { signUpSchema } from '@infrastructure';
import { useEffect } from 'react';

export const Page = () => {
    const { googleSignIn } = useAuth();

    const {
        credentialError,
        credentialOnSubmit,
        credentialLoading
    } = useCredentialSignUp();

    return (
        <>
            <SignInUpPageContainer>
                <SignInUpPageImage />
                <SignInUpFormContainer>
                    <Heading>Criar conta</Heading>
                    <GoogleSignInButton onClick={googleSignIn.mutate} />
                    <Separator>Ou</Separator>
                    {credentialError && <ErrorAlert>{credentialError}</ErrorAlert>}
                    <Form onSubmit={credentialOnSubmit} schema={signUpSchema}>
                        <Input name='name' inputLabel={{ text: 'Nome', mandatory: true }} placeholder='Digite como gostaria de ser chamado' type='text'/>
                        <Input name='email' inputLabel={{ text: 'E-mail', mandatory: true }} placeholder='Digite aqui seu e-mail' type='email'/>
                        <PasswordInput 
                            name='password' 
                            inputLabel={{ text: 'Senha', mandatory: true }}    
                            placeholder='Digite aqui sua senha'                 
                        />
                        <PasswordInput 
                            name='confirmPassword' 
                            inputLabel={{ text: 'Confirmação de Senha', mandatory: true }}    
                            placeholder='Digite novamente sua senha'                 
                        />
                        <FormButton label="Criar conta" loading={credentialLoading}/>
                    </Form>
                </SignInUpFormContainer>
            </SignInUpPageContainer>
            <Footer />
        </>
    );
}

const useCredentialSignUp = () => {
    const { credentialsSignUp } = useAuth();
    const onSubmit = async ({ name, email, password, confirmPassword }) => {
        try {
            credentialsSignUp.mutate({ name, email, password, confirmPassword });
        } catch (e) {
            console.error({e})
        }
    }

    useEffect(() => {
        if(credentialsSignUp.error) {
            errorToast("Houve um erro");
        }
    }, [credentialsSignUp]);

    return {
        credentialError: credentialsSignUp.error?.message,
        credentialOnSubmit: onSubmit,
        credentialLoading: credentialsSignUp.isLoading
    }
}