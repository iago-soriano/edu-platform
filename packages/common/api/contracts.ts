import { HTTPControllerDefinition } from "./interfaces";

// sign-in
export interface SignInRequestBody { email: string, password: string }
export interface SignInResponseBody { token: string }
export const SignInHTTPDefinition: HTTPControllerDefinition = {
    method: 'post',
    path: 'sign-in'
}

export type ProviderSignInRequestBody = { email: string, provider: string }
export type ProviderSignInResponseBody = { }
export const ProviderSignInHTTPDefinition: HTTPControllerDefinition = {
    method: 'post',
    path: 'sign-in/provider'
}

// sign-up
export interface SignUpRequestBody { email: string, password: string, confirmPassword: string, name: string }
export interface SignUpResponseBody { }
export const SignUpHTTPDefinition: HTTPControllerDefinition = {
    method: 'post',
    path: 'sign-up'
}

export interface ProviderSignUpRequestBody { email: string, id: string, image: string, provider: string, name: string }
export interface ProviderSignUpResponseBody { }
export const ProviderSignUpHTTPDefinition: HTTPControllerDefinition = {
    method: 'post',
    path: 'sign-up/provider'
}

// sign-out
export interface SignOutRequestBody { }
export interface SignOutResponseBody { }
export const SignOutHTTPDefinition: HTTPControllerDefinition = {
    method: 'post',
    path: 'sign-out'
}

