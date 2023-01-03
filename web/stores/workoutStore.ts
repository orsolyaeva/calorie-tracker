import create from 'zustand'

type WorkoutStore = {
    caloriesBurned: number
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
    caloriesBurned: 0,
}))