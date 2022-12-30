import { WorkoutCategory } from '../models/WorkoutCategory'
import axios from 'axios'
import { Workout } from '../models/Workout'
import {
    API_ADD_WORKOUT,
    API_DELETE_WORKOUT,
    API_GET_WORKOUTS_FOR_INTERVAL,
    API_GET_WORKOUT_CATEGORIES,
} from '../utils/constants'

export const GetWorkoutsForInterval = async (startDate: Date, endDate: Date, userId: number): Promise<Workout[]> => {
    try {
        const workouts = (
            await axios.post(`${API_GET_WORKOUTS_FOR_INTERVAL}`, {
                startTime: startDate.toISOString(),
                endTime: endDate.toISOString(),
                userId,
            })
        ).data
        if (workouts.length) {
            return workouts
        } else {
            return []
        }
    } catch (e) {
        return []
    }
}

export const GetWorkoutCategories = async (): Promise<WorkoutCategory[]> => {
    try {
        const workoutCategories = (await axios.get(`${API_GET_WORKOUT_CATEGORIES}`)).data
        if (workoutCategories.length) {
            return workoutCategories
        } else {
            return []
        }
    } catch (e) {
        return []
    }
}

export const AddWorkout = async (
    workout: Pick<Workout, 'name' | 'workoutCategoryId' | 'caloriesBurned' | 'duration'>,
    userId: number
): Promise<Workout> => {
    try {
        const result = await axios.post(`${API_ADD_WORKOUT}`, {
            ...workout,
            userId,
        })
        return result.data
    } catch (e) {
        throw e
    }
}

export const DeleteWorkout = async (workoutId: number): Promise<boolean> => {
    try {
        await axios.delete(`${API_DELETE_WORKOUT}/${workoutId}`)
        return true
    } catch (e) {
        return false
    }
}
