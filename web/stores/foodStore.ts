import create from 'zustand'

type FoodStore = {
    caloriesConsumed: number
    incrementBy: (amount: number) => void
    decrementBy: (amount: number) => void
}

export const useFoodStore = create<FoodStore>((set) => ({
    caloriesConsumed: 0,
    incrementBy: (amount: number) => set((state) => ({ caloriesConsumed: state.caloriesConsumed + amount })),
    decrementBy: (amount: number) => set((state) => ({ caloriesConsumed: state.caloriesConsumed - amount })),
}))