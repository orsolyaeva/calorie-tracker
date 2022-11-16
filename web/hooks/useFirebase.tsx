import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useReducer } from "react";
import { FirebaseState, FirebaseStore } from "../utils/types";
import { AuthProvider, getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import axios from 'axios';
import {API_LOGIN} from "../utils/constants";

const firebaseConfig = {
    apiKey: "AIzaSyBKKPra9Nx7ehYaJjXrWJtwynshDMf-TBM",
    authDomain: "titanium-diode-366714.firebaseapp.com",
    projectId: "titanium-diode-366714",
    storageBucket: "titanium-diode-366714.appspot.com",
    messagingSenderId: "600019112902",
    appId: "1:600019112902:web:2fe950a9267cd40c3298c7",
    measurementId: "G-S1ZH9XKQJ0"
};

export const FIREBASE_ACTIONS = {
    SET_APP: 'SET_APP',
    SET_USER: 'SET_USER',
    SIGN_OUT: 'SIGN_OUT',
    SIGN_IN: 'SIGN_IN'
};

export const firebaseReducer = (state: FirebaseState, action: any) => {
    switch (action.type) {
        case FIREBASE_ACTIONS.SET_APP:
            return {
                ...state,
                app: action.payload,
            };
        case FIREBASE_ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case FIREBASE_ACTIONS.SIGN_OUT:
            return {
                ...state,
                user: null,
                accessToken: null
            };
        case FIREBASE_ACTIONS.SIGN_IN:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken
            };
        default:
            return state;
    }
};

export const FirebaseContext = createContext<FirebaseStore>({
    state: {} as FirebaseState,
    dispatch: () => {},
    login: () => {},
    logout: () => {},
});

const getAuthProviderWithScopes = () : AuthProvider => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/fitness.activity.read');
    return provider;
}

export const useFirebaseState = () : FirebaseStore => {
    const [state, dispatch] = useReducer(firebaseReducer, {
        app: initializeApp(firebaseConfig),
        authProvider: getAuthProviderWithScopes(),
        auth: getAuth(),
        user: null,
        accessToken: null
    });

    useEffect(() => {
        (async () => {
            const result = await getRedirectResult(state.auth);
            if (result) {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log(credential);
                const accessToken = credential?.accessToken;

                if (accessToken) {
                    const response = await axios.post(API_LOGIN, {
                        accessToken,
                        email: result.user?.email
                    })
                }

                dispatch({type: FIREBASE_ACTIONS.SIGN_IN, payload: {user: result.user, accessToken}});
            }
        })();
        onAuthStateChanged(state.auth, (user) => {
            if (user && !state.user) {
                console.log('You are logged in!');
                (async () => {
                    const accessToken = (await axios.get(`${API_LOGIN}/${user.email}`)).data.accessToken;
                    console.log(accessToken);
                    dispatch({type: FIREBASE_ACTIONS.SIGN_IN, payload: {user: user, accessToken: accessToken}});
                })();
            }
        });
    }, []);

    const login = async () => {
        await signInWithRedirect(state.auth, state.authProvider);
    }

    const logout = async () => {
        try {
            await signOut(state.auth);
            dispatch({type: FIREBASE_ACTIONS.SIGN_OUT});
        } catch (e) {

        }
    }

    return { state, dispatch, login, logout };
}

export const FirebaseContextProvider = ({ children }: any) => {
    const { state, dispatch, login, logout } = useFirebaseState();
    return (
        <FirebaseContext.Provider value={{ state, dispatch, login, logout }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebaseContext = () => useContext<FirebaseStore>(FirebaseContext);