import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormModal } from './formModal';
import { AddWorkout, GetWorkoutCategories } from '../services/WorkoutService';
import { SleepEntry, WorkoutCategory } from '@prisma/client';
import { FormDateInput, FormInput, FormSelect, FormTimeInput } from './formComponents';
import { useUserStore } from '@stores/userStore';
import moment from 'moment';
import { AddSleepEntry, UpdateSleepEntry } from '@services/SleepService';

type SleepFormInput = {
    duration: number;
    completedAt: string;
};

const defaultValues = { completedAt: moment(new Date()).format('hh:mm'), duration: 0}

export const SleepForm : FC<{isOpen: boolean, setIsOpen: any, setSleep: any, entry: SleepEntry | null}> = ({isOpen, setIsOpen, setSleep, entry}) => {
    const { user } = useUserStore((state) => state);
    const { register, handleSubmit, reset } = useForm<SleepFormInput>({
        defaultValues,
    });
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        if (entry && defaultValues.duration === 0) {
            reset({
                completedAt: moment(entry.completedAt).format('hh:mm'),
                duration: entry.duration
            })
        }
    }, [entry])

    const onSubmit: SubmitHandler<SleepFormInput> = async (data) => {
        if (!user) return;
        const { completedAt, duration } = data;

        let sleepEntryData: any = {
            completedAt: moment(completedAt, 'hh:mm').toDate(),
            duration,
            userId: user.id
        }

        if (entry) {
            sleepEntryData = {
                ...sleepEntryData,
                id: entry.id
            }
            const sleepEntry = await UpdateSleepEntry(sleepEntryData);
            setSleep(sleepEntry);
        } else {
            const sleepEntry = await AddSleepEntry(sleepEntryData);
            reset(defaultValues);
            setSleep(sleepEntry);
        }
        closeModal();
    }
    
    return (
        <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1 className="text-xl text-primary font-semibold mb-4">Add sleep entry</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                    <FormTimeInput
                        inputProps={register('completedAt', {
                            required: 'This is required',
                        })}
                        labelFor={'completedAt'}
                        label="Completed at"
                    />
                    <FormInput
                        inputProps={register('duration', {
                            required: 'This is required',
                            valueAsNumber: true,
                            min: 0.0,
                        })}
                        type="number"
                        labelFor={'duration'}
                        label="Duration (hours)"
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