import { FC } from 'react'
import { useFirebaseContext } from '../hooks/useFirebase'
import InformationPanel from './informationPanel'
import WorkoutEntry from './workoutEntry'

const WorkoutPanel: FC = () => {
    const { state } = useFirebaseContext()

    return (
        <InformationPanel
            title={'Workout'}
            icon={'/workout.png'}
            headerChild={
                <div className={'flex flex-col items-end'}>
                    <div className={'text-sm text-primary font-semibold'}>400 cal</div>
                    <div className={'text-xs text-wildBlue font-regular'}>1h 12m</div>
                </div>
            }
        >
            <div className={'flex flex-col gap-4'}>
                <WorkoutEntry name={'Running'} time={'00:42:00'} calories={'210 Cal'} type={'Endurance'}></WorkoutEntry>
                <WorkoutEntry name={'Running'} time={'00:42:00'} calories={'210 Cal'} type={'Endurance'}></WorkoutEntry>
                <WorkoutEntry name={'Running'} time={'00:42:00'} calories={'210 Cal'} type={'Endurance'}></WorkoutEntry>
            </div>
        </InformationPanel>
    )
}

export default WorkoutPanel
