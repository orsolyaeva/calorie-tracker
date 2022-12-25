import { Workout } from './Workout'

export type WorkoutCategory = {
    id: number
    name: string
    workouts?: Workout[]
}
