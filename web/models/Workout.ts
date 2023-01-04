import { WorkoutCategory } from './WorkoutCategory'

export type Workout = {
    id: number
    name: string
    userId: number
    completedAt: Date
    duration: number
    caloriesBurned: number
    workoutCategoryId: number
    workoutCategory: WorkoutCategory
}
