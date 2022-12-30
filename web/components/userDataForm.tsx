import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useFirebaseContext } from '../hooks/useFirebase'
import { FormInput, FormSelect } from './formComponents'

type OnboardingFormInput = {
    currentWeight: number
    goalWeight: number
    gender: boolean
    age: number
    height: number
    activityLevel: number
    weeklyGoal: number
}

export const UserDataForm: FC<{ defaultValues?: any; onFormSubmitted: any }> = ({ defaultValues, onFormSubmitted }) => {
    const { register, handleSubmit, reset, control } = useForm<OnboardingFormInput>({
        defaultValues: defaultValues || {},
    })
    const { state } = useFirebaseContext()

    const onSubmit: SubmitHandler<OnboardingFormInput> = async (data) => {
        const goalDate = new Date()
        const amountOfWeeks = (data.currentWeight - data.goalWeight) / data.weeklyGoal
        goalDate.setDate(goalDate.getDate() + amountOfWeeks * 7)

        const onboardingData = {
            currentWeight: data.currentWeight,
            startWeight: data.currentWeight,
            goalWeight: data.goalWeight,
            age: data.age,
            height: data.height,
            gender: Boolean(data.gender),
            activityLevel: data.activityLevel,
            weeklyGoal: data.weeklyGoal,
            goalDate: goalDate,
            userId: state.user.id,
        }

        return onFormSubmitted(onboardingData)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                inputProps={register('currentWeight', {
                    required: 'This is required',
                    valueAsNumber: true,
                    min: 0,
                })}
                type="number"
                labelFor={'currentWeight'}
                label="Current Weight"
            />
            <FormInput
                inputProps={register('goalWeight', {
                    required: 'This is required',
                    valueAsNumber: true,
                    min: 0,
                })}
                type="number"
                labelFor={'goalWeight'}
                label="Goal Weight"
            />
            <FormInput
                inputProps={register('age', {
                    required: 'This is required',
                    valueAsNumber: true,
                    min: 14,
                })}
                type="number"
                labelFor={'age'}
                label="Age"
            />
            <FormInput
                inputProps={register('height', {
                    required: 'This is required',
                    valueAsNumber: true,
                    min: 0,
                })}
                type="number"
                labelFor={'height'}
                label="Height"
            />
            <FormSelect
                selectProps={register('gender', {
                    required: 'This is required',
                    valueAsNumber: true,
                })}
                options={[
                    { value: 0, label: 'Male' },
                    { value: 1, label: 'Female' },
                ]}
                labelFor={'gender'}
                label="Gender"
            />
            <FormSelect
                selectProps={register('activityLevel', {
                    required: 'This is required',
                    valueAsNumber: true,
                })}
                options={[
                    { value: 0, label: 'Sedentary' },
                    { value: 1, label: 'Lightly Active' },
                    { value: 2, label: 'Moderately Active' },
                    { value: 3, label: 'Very Active' },
                    { value: 4, label: 'Extremely Active' },
                ]}
                labelFor={'activityLevel'}
                label="Activity Level"
            />
            <FormSelect
                selectProps={register('weeklyGoal', {
                    required: 'This is required',
                    valueAsNumber: true,
                })}
                options={[
                    { value: 0.25, label: 'Lose 0.25 kg per week' },
                    { value: 0.5, label: 'Lose 0.5 kg per week' },
                    { value: 0.75, label: 'Lose 0.75 kg per week' },
                    { value: 1, label: 'Lose 1 kg per week' },
                ]}
                labelFor={'weeklyGoal'}
                label="Weekly Goal"
            />

            <div className="flex items-center gap-8 pt-4 justify-end">
                <button
                    type="submit"
                    className="font-medium rounded-lg px-4 py-2 bg-blue-500 text-white cursor-pointer"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
