import create from 'zustand'

type WaterIntakeStore = {
    amount: number
}

export const useWaterIntakeStore = create<WaterIntakeStore>((set) => ({
    amount: 0,
}))