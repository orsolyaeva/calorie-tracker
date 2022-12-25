import { FieldOptions } from './constants'
import { FirebaseApp } from 'firebase/app'
import { Auth, AuthProvider, GoogleAuthProvider, OAuthCredential } from 'firebase/auth'

export type FirebaseState = {
    app: FirebaseApp
    authProvider: AuthProvider
    auth: Auth
    user: any
    accessToken: OAuthCredential | null
    googleData: Record<string, number>
    waterIntake: number
}

export type FirebaseStore = {
    state: FirebaseState
    isLoaded: boolean

    refetch: (field: FieldOptions) => void
    refetchAll: () => void
    dispatch: (action: any) => void
    login: () => void
    logout: () => void
}
