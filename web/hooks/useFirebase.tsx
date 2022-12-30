import { initializeApp } from 'firebase/app'
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { FirebaseState, FirebaseStore } from '../utils/types'
import {
    AuthProvider,
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithRedirect,
    signOut,
} from 'firebase/auth'
import axios from 'axios'
import { API_LOGIN, FieldOptions } from '../utils/constants'
import { GetWaterIntakeForInterval } from '../services/WaterIntakeService'
import { GetGoogleData } from '../services/GoogleDataService'
import { useRouter } from 'next/router'

const firebaseConfig = {
    apiKey: 'AIzaSyBKKPra9Nx7ehYaJjXrWJtwynshDMf-TBM',
    authDomain: 'titanium-diode-366714.firebaseapp.com',
    projectId: 'titanium-diode-366714',
    storageBucket: 'titanium-diode-366714.appspot.com',
    messagingSenderId: '600019112902',
    appId: '1:600019112902:web:2fe950a9267cd40c3298c7',
    measurementId: 'G-S1ZH9XKQJ0',
}

export const FIREBASE_ACTIONS = {
    SET_APP: 'SET_APP',
    SET_USER: 'SET_USER',
    SIGN_OUT: 'SIGN_OUT',
    SIGN_IN: 'SIGN_IN',
    SET_GOOGLE_DATA: 'SET_GOOGLE_DATA',
    SET_WATER_INTAKE: 'SET_WATER_INTAKE',
    SET_IS_LOADING: 'SET_IS_LOADING',
}

export const firebaseReducer = (state: FirebaseState, action: any) => {
    switch (action.type) {
        case FIREBASE_ACTIONS.SET_APP:
            return {
                ...state,
                app: action.payload,
            }
        case FIREBASE_ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case FIREBASE_ACTIONS.SIGN_OUT:
            return {
                ...state,
                user: null,
                accessToken: null,
                isLoading: false,
            }
        case FIREBASE_ACTIONS.SIGN_IN:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                isLoading: false,
            }
        case FIREBASE_ACTIONS.SET_GOOGLE_DATA:
            return {
                ...state,
                googleData: action.payload,
            }
        case FIREBASE_ACTIONS.SET_WATER_INTAKE:
            return {
                ...state,
                waterIntake: action.payload,
            }
        case FIREBASE_ACTIONS.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state
    }
}

export const FirebaseContext = createContext<FirebaseStore>({
    state: {} as FirebaseState,
    isLoaded: false,
    dispatch: () => {},
    login: () => {},
    logout: () => {},
    refetch: () => {},
    refetchAll: () => {},
})

const getAuthProviderWithScopes = (): AuthProvider => {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/fitness.activity.read')
    provider.addScope('https://www.googleapis.com/auth/fitness.body.read')
    provider.addScope('https://www.googleapis.com/auth/fitness.location.read')
    provider.addScope('https://www.googleapis.com/auth/fitness.nutrition.read')
    return provider
}

export const useFirebaseState = (): FirebaseStore => {
    const [state, dispatch] = useReducer(firebaseReducer, {
        app: initializeApp(firebaseConfig),
        authProvider: getAuthProviderWithScopes(),
        auth: getAuth(),
        user: null,
        accessToken: null,
        googleData: {},
        waterIntake: 0,
        isLoading: true,
    })
    const [isLoaded, setIsLoaded] = useState(false)
    const router = useRouter()

    useEffect(() => {
        ;(async () => {
            const result = await getRedirectResult(state.auth)
            if (result) {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const accessToken = credential?.accessToken

                if (accessToken) {
                    const response = await axios.post(API_LOGIN, {
                        accessToken,
                        email: result.user?.email,
                    })

                    const user = response.data
                    const combinedUser = { ...user, photoURL: user.photoURL }

                    if (!user.finishedOnboarding) {
                        dispatch({ type: FIREBASE_ACTIONS.SET_USER, payload: combinedUser })
                        router.push('/onboarding')
                        return
                    }
                }

                router.push('/dashboard')

                // dispatch({ type: FIREBASE_ACTIONS.SIGN_IN, payload: { user: result.user, accessToken } })
            }
        })()
    }, [])

    onAuthStateChanged(state.auth, (user) => {
        if (user && !state.user) {
            console.log('You are logged in!')
            ;(async () => {
                const data = (await axios.get(`${API_LOGIN}/${user.email}`)).data
                const accessToken = data.accessToken
                const combinedUser = { ...data, photoURL: user.photoURL }
                if (!combinedUser.finishedOnboarding) {
                    dispatch({ type: FIREBASE_ACTIONS.SET_USER, payload: combinedUser })
                    router.push('/onboarding')
                    return
                }
                dispatch({ type: FIREBASE_ACTIONS.SIGN_IN, payload: { user: combinedUser, accessToken: accessToken } })
            })()
        } else if (!user) {
            dispatch({ type: FIREBASE_ACTIONS.SET_IS_LOADING, payload: false })
        }
    })

    useEffect(() => {
        if (!state.accessToken) return
        ;(async () => {
            const startDate = new Date()
            startDate.setHours(0, 0, 0, 0)
            const endDate = new Date()

            try {
                const googleData = await GetGoogleData(startDate, endDate, state.accessToken)
                dispatch({ type: FIREBASE_ACTIONS.SET_GOOGLE_DATA, payload: googleData })
            } catch (e) {
                logout()
            }
            const waterIntake = await GetWaterIntakeForInterval(startDate, endDate)
            dispatch({ type: FIREBASE_ACTIONS.SET_WATER_INTAKE, payload: waterIntake })

            setIsLoaded(true)
        })()
    }, [state.accessToken])

    const login = async () => {
        await signInWithRedirect(state.auth, state.authProvider)
    }

    const logout = async () => {
        try {
            await signOut(state.auth)
            dispatch({ type: FIREBASE_ACTIONS.SIGN_OUT })
        } catch (e) {}
    }

    const refetch = async (field: FieldOptions) => {
        if (!state.accessToken) return
        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0)
        const endDate = new Date()
        if (field === FieldOptions.WaterIntake) {
            const waterIntake = await GetWaterIntakeForInterval(startDate, endDate)
            dispatch({ type: FIREBASE_ACTIONS.SET_WATER_INTAKE, payload: waterIntake })
        } else if (field === FieldOptions.GoogleData) {
            try {
                const googleData = await GetGoogleData(startDate, endDate, state.accessToken)
                dispatch({ type: FIREBASE_ACTIONS.SET_GOOGLE_DATA, payload: googleData })
            } catch (e) {
                logout()
            }
        }
    }

    const refetchAll = async () => {
        if (!state.accessToken) return
        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0)
        const endDate = new Date()
        try {
            const googleData = await GetGoogleData(startDate, endDate, state.accessToken)
            dispatch({ type: FIREBASE_ACTIONS.SET_GOOGLE_DATA, payload: googleData })
        } catch (e) {
            logout()
        }
        const waterIntake = await GetWaterIntakeForInterval(startDate, endDate)
        dispatch({ type: FIREBASE_ACTIONS.SET_WATER_INTAKE, payload: waterIntake })
    }

    return { state, dispatch, login, isLoaded, logout, refetch, refetchAll }
}

export const FirebaseContextProvider = ({ children }: any) => {
    const { state, dispatch, login, logout, isLoaded, refetch, refetchAll } = useFirebaseState()
    return (
        <FirebaseContext.Provider value={{ state, dispatch, isLoaded, login, logout, refetch, refetchAll }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export const useFirebaseContext = () => useContext<FirebaseStore>(FirebaseContext)
