import create from 'zustand'

type GoogleDataStore = {
    steps: number
    calories: number
    distance: number
    activeMinutes: number
}

export const useGoogleDataStore = create<GoogleDataStore>((set) => ({
    steps: 0,
    calories: 0,
    distance: 0,
    activeMinutes: 0,
}))