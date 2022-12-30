import { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { FormModal } from './formModal'
import { AddWorkout, GetWorkoutCategories } from '../services/WorkoutService'
import { WorkoutCategory } from '@prisma/client'
import { useFirebaseContext } from '../hooks/useFirebase'
import { FormInput, FormSelect } from './formComponents'

type WorkoutFormInput = {
    name: string
    workoutCategory: number
    caloriesBurned: number
    duration: number
}

export const WorkoutForm: FC<{ isOpen: boolean; setIsOpen: any; addWorkout: any }> = ({
    isOpen,
    setIsOpen,
    addWorkout,
}) => {
    const [workoutCategoryOptions, setWorkoutCategoryOptions] = useState<{ value: number; label: string }[]>([])
    const { state } = useFirebaseContext()

    const { register, handleSubmit, reset, control } = useForm<WorkoutFormInput>({
        defaultValues: { name: '', workoutCategory: 0, caloriesBurned: 0, duration: 0 },
    })

    useEffect(() => {
        ;(async () => {
            const result = await GetWorkoutCategories()
            const options = result.map((category: WorkoutCategory) => ({
                value: category.id,
                label: category.name,
            }))
            setWorkoutCategoryOptions(options)
        })()
    }, [])

    const onSubmit: SubmitHandler<WorkoutFormInput> = async (data) => {
        const { name, workoutCategory, caloriesBurned, duration } = data
        const workoutData = {
            name,
            workoutCategoryId: workoutCategory,
            caloriesBurned,
            duration,
        }
        console.log(workoutData)
        const workout = await AddWorkout(workoutData, state.user.id)
        addWorkout(workout)
        reset({ name: '', workoutCategory: 0, caloriesBurned: 0, duration: 0 })
    }

    return (
        <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1 className="text-xl text-primary font-semibold">Add workout entry</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    inputProps={register('name', {
                        required: 'This is required',
                        minLength: 3,
                    })}
                    labelFor={'name'}
                    label="Name"
                />
                <FormSelect
                    selectProps={register('workoutCategory', {
                        required: 'This is required',
                        valueAsNumber: true,
                    })}
                    options={workoutCategoryOptions}
                    labelFor={'workoutCategory'}
                    label="Category"
                />
                <FormInput
                    inputProps={register('caloriesBurned', {
                        required: 'This is required',
                        valueAsNumber: true,
                        min: 0,
                    })}
                    type="number"
                    labelFor={'caloriesBurned'}
                    label="Calories Burned"
                />
                <FormInput
                    inputProps={register('duration', {
                        required: 'This is required',
                        valueAsNumber: true,
                        min: 0,
                    })}
                    type="number"
                    labelFor={'duration'}
                    label="Duration"
                />
                <div className="flex items-center gap-8 pt-4 justify-end">
                    <button type="button" className="font-medium text-slate-500 cursor-pointer">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="font-medium rounded-lg px-4 py-2 bg-blue-500 text-white cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </FormModal>
    )
}
