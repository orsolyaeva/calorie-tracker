import { User } from '@prisma/client'
import create from 'zustand'

type UserStore = {
    user: User & { photoURL: string } | null
    accessToken: string | null
    isLoading: boolean
    dataLoaded: boolean
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    accessToken: null,
    isLoading: true,
    dataLoaded: false,
}))