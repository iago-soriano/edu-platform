import { 
    // sign-in
    SignInHTTPDefinition,
    SignInRequestBody,
    SignInResponseBody,
    // sign-up
    SignUpHTTPDefinition,
    SignUpRequestBody,
    SignUpResponseBody,
    //sign-out
    SignOutHTTPDefinition,
    SignOutRequestBody,
    SignOutResponseBody,
    // provider sign-in
    ProviderSignInHTTPDefinition,
    ProviderSignInRequestBody,
    ProviderSignInResponseBody,
    // provider sign-up
    ProviderSignUpHTTPDefinition,
    ProviderSignUpRequestBody,
    ProviderSignUpResponseBody,
} from './contracts';
import { IHTTPClient } from './interfaces';

export interface IApiClient {
    SignIn: (args: SignInRequestBody) => Promise<SignInResponseBody>; 
    SignUp: (args: SignUpRequestBody) => Promise<SignUpResponseBody>; 
    SignOut: (args: SignOutRequestBody) => Promise<SignOutResponseBody>; 
    ProviderSignUp: (args: ProviderSignUpRequestBody) => Promise<ProviderSignUpResponseBody>;
    ProviderSignIn: (args: ProviderSignInRequestBody) => Promise<ProviderSignInResponseBody>;
}

export class ApiClient implements IApiClient {
    constructor(private _httpClient: IHTTPClient) {}

    async SignIn (args: SignInRequestBody) {        
        return (this._httpClient.post(SignInHTTPDefinition.path, args) as Promise<SignInResponseBody>);
        // this._httpClient.setHeader("edu-platform.auth", token);
        // return { token };
    }

    SignUp (args: SignUpRequestBody) {
        return this._httpClient.post(SignUpHTTPDefinition.path, args) as Promise<SignUpResponseBody>;
    }

    async SignOut (args: SignOutRequestBody) {
        await this._httpClient.post(SignOutHTTPDefinition.path, args) as Promise<SignOutResponseBody>;
        this._httpClient.setHeader("edu-platform.auth", "");
        return {};
    }

    async ProviderSignIn (args: ProviderSignInRequestBody) {        
        return (this._httpClient.post(ProviderSignInHTTPDefinition.path, args) as Promise<ProviderSignInResponseBody>);
    }

    ProviderSignUp (args: ProviderSignUpRequestBody) {
        return this._httpClient.post(ProviderSignUpHTTPDefinition.path, args) as Promise<ProviderSignUpResponseBody>;
    }
}