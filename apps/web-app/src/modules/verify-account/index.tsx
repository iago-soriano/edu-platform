import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router'
import { Heading } from '@components';
import {
    useQuery,
    useMutation,
    UseMutationResult,
  } from '@tanstack/react-query';
import { PageStyled } from './styles';
import { api, LocalStorageHelper, useHasMounted } from "@infrastructure";
import { ServerError } from '@edu-platform/common';
import { Spinner } from '@components';

export const Page = () => {

    const { loading, error, verified } = useVerifyAccount();
    
    const renderPage = () => {
        if(loading) return <div id="spinner"><Spinner /></div>;
        if(error) return <p>Um erro ocorreu. Envie um e-mail para edu-platform@gmail.com</p>;
        if(!verified) return (
            <>
                <Heading level={1}>Um e-mail de verificação de conta foi enviado para o seu e-mail.</Heading>
                <Heading level={3}>Clique no botão enviado no e-mail para entrar.</Heading>
            </>
        );
        if(verified) return (
            <>
                <Heading>Bem-vindo(a)!</Heading>
                <a href="/sign-in">Entrar</a>
            </>
        )
    }

    return (
        <PageStyled>
            {renderPage()}
        </PageStyled>
    );
}

const useVerifyAccount = () => {

    const router = useRouter();
    const localStorage = new LocalStorageHelper();

    const [verifyState, setVerifyState] = useState({
        loading: true,
        error: null,
        verified: false
    });

    const verificationToken = useMemo(() => Array.isArray(router.query.verificationToken) ? router.query.verificationToken[0] : router.query.verificationToken, [router.query]);

    const mutation = useMutation(async () => await api.VerifyAccount({ verifyAccountToken: verificationToken }), {
        onSuccess: () => {
            localStorage.setVerifiedToken(verificationToken);
            setVerifyState({
                loading: false,
                error: null,
                verified: true
            });
        },
        onError: (e: ServerError) => {
            setVerifyState({
                loading: false,
                error: e.message,
                verified: false
            });
        }
    });

    useEffect(() => {
        if(router.isReady) {
            // user is entering this page after having already verified their account
            if(localStorage.hasToken(verificationToken)) {
                setVerifyState({
                    loading: false,
                    error: null,
                    verified: true
                });
                return;
            }
    
            // user has not yet verified their account, and is coming from the sign-up page
            if(!verificationToken) {
                setVerifyState({
                    loading: false,
                    error: null,
                    verified: false
                });
                return;
            }

            if(verificationToken) {
                console.log({verifyState})
                mutation.mutate();
            }
        }
    }, [verificationToken]);

    return verifyState;
}