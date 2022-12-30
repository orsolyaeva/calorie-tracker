import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { useFirebaseContext } from '../hooks/useFirebase'
import { Workout } from '../models/Workout'
import { DeleteWorkout, GetWorkoutsForInterval } from '../services/WorkoutService'
import { withPadding } from '../utils/constants'
import InformationPanel from './informationPanel'
import WorkoutEntry from './workoutEntry'
import 'moment-duration-format'
import { FormModal } from './formModal'
import { WorkoutForm } from './workoutForm'

const WorkoutPanel: FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([])
    const [totalCalories, setTotalCalories] = useState<number>(0)
    const [totalTime, setTotalTime] = useState<number>(0)
    const { state: firebase } = useFirebaseContext()
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)

    useEffect(() => {
        ;(async () => {
            const startDate = new Date()
            startDate.setHours(0, 0, 0, 0)
            const endDate = new Date()
            const result = await GetWorkoutsForInterval(startDate, endDate, firebase.user.id)

            const total = result.reduce(
                (acc, curr) => {
                    return {
                        totalCalories: acc.totalCalories + curr.caloriesBurned,
                        totalTime: acc.totalTime + curr.duration,
                    }
                },
                { totalCalories: 0, totalTime: 0 }
            )

            setTotalCalories(total.totalCalories)
            setTotalTime(total.totalTime)
            setWorkouts(result)
        })()
    }, [firebase.user.id])

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

        setTotalCalories(total.totalCalories)
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

        setTotalCalories(total.totalCalories)
        setTotalTime(total.totalTime)
        setWorkouts(newWorkouts)
    }

    return (
        <InformationPanel
            title={'Workout'}
            icon={'/workout.png'}
            headerChild={
                <div className={'flex flex-col items-end'}>
                    <div className={'text-sm text-primary font-semibold'}>{totalCalories} cal</div>
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
