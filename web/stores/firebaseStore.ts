import create from 'zustand'
import { initializeApp } from 'firebase/app'
import { AuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBKKPra9Nx7ehYaJjXrWJtwynshDMf-TBM',
    authDomain: 'titanium-diode-366714.firebaseapp.com',
    projectId: 'titanium-diode-366714',
    storageBucket: 'titanium-diode-366714.appspot.com',
    messagingSenderId: '600019112902',
    appId: '1:600019112902:web:2fe950a9267cd40c3298c7',
    measurementId: 'G-S1ZH9XKQJ0',
}

const getAuthProviderWithScopes = (): AuthProvider => {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/fitness.activity.read')
    provider.addScope('https://www.googleapis.com/auth/fitness.body.read')
    provider.addScope('https://www.googleapis.com/auth/fitness.location.read')
    provider.addScope('https://www.googleapis.com/auth/fitness.nutrition.read')
    return provider
}

type FirebaseStore = {
    app: any
    authProvider: AuthProvider
    auth: any
}

export const useFirebaseStore = create<FirebaseStore>((set) => ({
    app: initializeApp(firebaseConfig),
    authProvider: getAuthProviderWithScopes(),
    auth: getAuth(),
}))
