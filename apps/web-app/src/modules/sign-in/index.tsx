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
    errorToast
} from '@components';
import { signInSchema } from '@infrastructure';
import { PageContainer, FormContainer, ImageContainer } from './styles';
import Image from 'next/image';
import { useEffect } from 'react';

export const Page = () => {
    const { googleSignIn, credentialsSignIn } = useAuth();

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
    return (
        <>
        <PageContainer>
            <ImageContainer>
                <Image
                    src="https://picsum.photos/400/600"
                    width={400}
                    height={600}
                    alt="Picture of the author"
                />
            </ImageContainer>
            <FormContainer>
                <Heading>Entrar</Heading>
                <GoogleSignInButton onClick={googleSignIn.mutate} />
                <hr />
                {credentialsSignIn.error && <ErrorAlert>{credentialsSignIn.error.message}</ErrorAlert>}
                <Form onSubmit={onSubmit} schema={signInSchema}>
                    <Input name='email' inputLabel={{ text: 'E-mail', mandatory: true }} placeholder='Digite aqui seu e-mail' type='email'/>
                    <PasswordInput 
                        name='password' 
                        inputLabel={{ text: 'Senha', mandatory: true }}    
                        placeholder='Digite aqui sua senha'                 
                    />
                    <FormButton label="Entrar" loading={credentialsSignIn.isLoading}/>
                </Form>
            </FormContainer>
        </PageContainer>
        <Footer />
        </>
    );
}