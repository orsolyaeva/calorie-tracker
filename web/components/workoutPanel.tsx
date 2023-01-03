import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { Workout } from '../models/Workout'
import { DeleteWorkout, GetWorkoutsForInterval } from '../services/WorkoutService'
import { withPadding } from '../utils/constants'
import InformationPanel from './informationPanel'
import WorkoutEntry from './workoutEntry'
import 'moment-duration-format'
import { WorkoutForm } from './workoutForm'
import { useUserStore } from '@stores/userStore'
import { useWorkoutStore } from '@stores/workoutStore'

const WorkoutPanel: FC = () => {
    const { caloriesBurned } = useWorkoutStore((state) => state)
    const [workouts, setWorkouts] = useState<Workout[]>([])
    const [totalTime, setTotalTime] = useState<number>(0)
    const { user } = useUserStore((state: any) => state)
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)

    useEffect(() => {
        if (!user?.id) return
        ;(async () => {
            const startDate = new Date()
            startDate.setHours(0, 0, 0, 0)
            const endDate = new Date()
            const result = await GetWorkoutsForInterval(startDate, endDate, user.id)

            const total = result.reduce(
                (acc, curr) => {
                    return {
                        totalCalories: acc.totalCalories + curr.caloriesBurned,
                        totalTime: acc.totalTime + curr.duration,
                    }
                },
                { totalCalories: 0, totalTime: 0 }
            )

            useWorkoutStore.setState({ caloriesBurned: total.totalCalories })
            setTotalTime(total.totalTime)
            setWorkouts(result)
        })()
    }, [user])

    const addWorkout = (workout: Workout) => {
        const newWorkouts = [...workouts, workout]
        // TODO: replace reduce with basic math
        const total = newWorkouts.reduce(
            (acc, curr) => {
                return {
                    totalCalories: acc.totalCalories + curr.caloriesBurned,
                    totalTime: acc.totalTime + curr.duration,
                }
            },
            { totalCalories: 0, totalTime: 0 }
        )

        useWorkoutStore.setState({ caloriesBurned: total.totalCalories })
        setTotalTime(total.totalTime)
        setWorkouts(newWorkouts)
    }

    const removeWorkout = async (workout: Workout) => {
        await DeleteWorkout(workout.id)
        const newWorkouts = workouts.filter((w) => w.id !== workout.id)

        // TODO: replace reduce with basic math
        const total = newWorkouts.reduce(
            (acc, curr) => {
                return {
                    totalCalories: acc.totalCalories + curr.caloriesBurned,
                    totalTime: acc.totalTime + curr.duration,
                }
            },
            { totalCalories: 0, totalTime: 0 }
        )

        useWorkoutStore.setState({ caloriesBurned: total.totalCalories })
        setTotalTime(total.totalTime)
        setWorkouts(newWorkouts)
    }

    return (
        <InformationPanel
            title={'Workout'}
            icon={'/workout.png'}
            headerChild={
                <div className={'flex flex-col items-end'}>
                    <div className={'text-sm text-primary font-semibold'}>{caloriesBurned} cal</div>
                    <div className={'text-xs text-wildBlue font-regular'}>
                        {moment.duration(totalTime, 'seconds').format('h [h] m [m] s [s]')}
                    </div>
                </div>
            }
        >
            <WorkoutForm isOpen={isOpen} setIsOpen={setIsOpen} addWorkout={addWorkout} />
            <div className={'flex flex-col gap-4'}>
                <button
                    className="flex w-full items-center p-2 justify-center bg-primary rounded-xl text-white hover:bg-primary/95"
                    onClick={openModal}
                >
                    Add workout
                </button>
                {workouts.map((workout, index) => (
                    <WorkoutEntry
                        key={`workout-${index}`}
                        name={workout.name}
                        time={withPadding(moment.duration(workout.duration, 'seconds'))}
                        calories={`${workout.caloriesBurned} Cal`}
                        type={workout.workoutCategory.name}
                        onDelete={() => removeWorkout(workout)}
                    />
                ))}
            </div>
        </InformationPanel>
    )
}

export default WorkoutPanel
