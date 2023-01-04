import { useFoodStore } from '@stores/foodStore'
import { useUserStore } from '@stores/userStore'
import { useWorkoutStore } from '@stores/workoutStore'
import { useEffect } from 'react'
import { FC, useState } from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import DataWithIcon from './dataWithIcon'

const caloriesToLose: Record<number, Record<string, number>> = {
    0.25: {
        female: 350,
        male: 500,
    },
    0.5: {
        female: 700,
        male: 1000,
    },
    0.75: {
        female: 1050,
        male: 1500,
    },
    1.0: {
        female: 1400,
        male: 2000,
    },
}

const activityLevelMultiplier = [1.2, 1.375, 1.55, 1.725, 1.9]

const OverviewPanel: FC = () => {
    const { user } = useUserStore((state) => state)
    const { caloriesBurned } = useWorkoutStore((state) => state)
    const { caloriesConsumed } = useFoodStore((state) => state)
    const [goal, setGoal] = useState(0)

    useEffect(() => {
        if (user) {
            // User is a female
            if (user.gender) {
                // Mifflin-St Jeor Equation for female
                const maintainGoal =
                    (655.1 + 9.563 * user.currentWeight + 1.85 * user.height - 4.676 * user.age) *
                    activityLevelMultiplier[user.activityLevel]
                setGoal(Math.ceil(maintainGoal - caloriesToLose[user.weeklyGoal][user.gender ? 'female' : 'male']))
            } else {
                // Mifflin-St Jeor Equation for male - take user activity level into account
                const maintainGoal =
                    (66.47 + 13.75 * user.currentWeight + 5.003 * user.height - 6.755 * user.age) *
                    activityLevelMultiplier[user.activityLevel]
                setGoal(Math.ceil(maintainGoal - caloriesToLose[user.weeklyGoal][user.gender ? 'female' : 'male']))
            }
        }
    }, [user])

    if (!user) return null

    return (
        <div className={'flex flex-col gap-6 w-full rounded-xl border-[1px] p-4'}>
            <div className={'flex justify-between items-center md:flex-row flex-col'}>
                <div className={'pr-1 md:basis-1/5 h-48 w-48 md:h-full md:w-full'}>
                    <CircularProgressbarWithChildren
                        styles={{ trail: { stroke: '#F7FAFF' }, path: { stroke: '#00b158' } }}
                        value={(caloriesConsumed * 100) / (goal + caloriesBurned)}
                        strokeWidth={6}
                    >
                        <div className={'flex flex-col justify-center items-center'}>
                            <div className={'text-2xl font-bold text-primary'}>
                                {goal - caloriesConsumed + caloriesBurned}
                            </div>
                            <div className={'text-wildBlue font-medium'}>remaining</div>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className={'flex w-full flex-col justify-center basis-4/5 gap-8 px-4 pr-2'}>
                    <div className={'flex justify-between items-center md:flex-row flex-col'}>
                        <div className={'text-base text-primary font-semibold'}>Calorie tracker details</div>
                        <div className={'text-base text-wildBlue font-medium'}>Remaining = Goal - Food + Exercise</div>
                    </div>
                    <div className={'flex flex gap-4 items-start justify-between md:flex-row flex-col'}>
                        <DataWithIcon icon={'🎯'} title={`${goal} Cal`} subTitle={'Base Goal'} />
                        <DataWithIcon icon={'🍳'} title={`${caloriesConsumed} Cal`} subTitle={'Food'} />
                        <DataWithIcon icon={'🔥'} title={`${caloriesBurned} Cal`} subTitle={'Exercise'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewPanel

/* Calories: Men: 66.5 + (13.75 x weight in kg) + (5.003 x height in cm) / 6.755 x age
             Women: 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) / 4.676 x age
    Calories to lose 0.25kg per week:
        Men: 500 calories less than maintenance
        Women: 350 calories less than maintenance
    Calories to lose 0.5kg per week:
        Men: 1000 calories less than maintenance
        Women: 700 calories less than maintenance
    Calories to lose 0.75kg per week:
        Men: 1500 calories less than maintenance
        Women: 1050 calories less than maintenance
    Calories to lose 1kg per week:
        Men: 2000 calories less than maintenance
        Women: 1400 calories less than maintenance
    Water: 0.03 x weight in kg
    Sleep: 13-18 years: 8-10 hours
           18-60 years: 7 - 9 hours
           60+ years: 7-8 hours
*/
