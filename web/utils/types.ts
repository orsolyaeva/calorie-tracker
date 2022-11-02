import { FirebaseApp } from "firebase/app";
import { Auth, AuthProvider, GoogleAuthProvider, OAuthCredential } from "firebase/auth";

export type FirebaseState = {
    app: FirebaseApp;
    authProvider: AuthProvider;
    auth: Auth;
    user: any;
    accessToken: OAuthCredential|null;
};

export type FirebaseStore = {
    state: FirebaseState;

    dispatch: (action: any) => void;
    login: () => void;
    logout: () => void;
};