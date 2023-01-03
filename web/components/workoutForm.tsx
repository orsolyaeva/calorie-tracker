import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormModal } from './formModal';
import { AddWorkout, GetWorkoutCategories } from '../services/WorkoutService';
import { WorkoutCategory } from '@prisma/client';
import { FormInput, FormSelect } from './formComponents';
import { useUserStore } from '@stores/userStore';

type WorkoutFormInput = {
    name: string;
    workoutCategory: number | null;
    caloriesBurned: number;
    duration: number;
};

const defaultValues = { name: '', workoutCategory: null, caloriesBurned: 0, duration: 0}

export const WorkoutForm : FC<{isOpen: boolean, setIsOpen: any, addWorkout: any}> = ({isOpen, setIsOpen, addWorkout}) => {
    const [workoutCategoryOptions, setWorkoutCategoryOptions] = useState<{ value: number; label: string }[]>([]);
    const { user } = useUserStore((state) => state);

    const closeModal = () => setIsOpen(false);
    const { register, handleSubmit, reset } = useForm<WorkoutFormInput>({
        defaultValues,
    });

    useEffect(() => {
        (async () => {
            const result = await GetWorkoutCategories();
            const options = result.map((category: WorkoutCategory) => ({
                value: category.id,
                label: category.name,
            }));
            setWorkoutCategoryOptions(options);
        })();
    }, []);

    const onSubmit: SubmitHandler<WorkoutFormInput> = async (data) => {
        const { name, workoutCategory, caloriesBurned, duration } = data;
        if (!workoutCategory || !user) return;
        const workoutData = {
            name,
            workoutCategoryId: workoutCategory,
            caloriesBurned,
            duration,
        };
        const workout = await AddWorkout(workoutData, user.id);
        addWorkout(workout);
        reset(defaultValues);
        closeModal();
    }
    
    return (
        <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1 className="text-xl text-primary font-semibold mb-4">Add workout entry</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
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
                        label="Duration (minutes)"
                    />
                    <div className="flex items-center gap-8 pt-4 justify-end">
                        <button type="button" className="font-medium text-slate-500 cursor-pointer" onClick={() => reset(defaultValues)}>
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="font-medium rounded-lg px-4 py-2 bg-blue-500 text-white cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
            
        </FormModal>
    )
}