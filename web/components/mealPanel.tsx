import { FC, useState } from 'react'
import DataWithIcon from './dataWithIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Meal } from '@models/Meal'
import MealEntry from './mealEntry'
import { FoodEntryForm } from './foodEntryForm'
import { FoodEntry } from '@prisma/client'
import { AddFoodEntry, DeleteFoodEntry } from '@services/FoodService'
import { useFoodStore } from '@stores/foodStore'
import { useEffect } from 'react'
import { useUserStore } from '@stores/userStore'

type MealPanelProps = { meal: Meal }

const MealPanel: FC<MealPanelProps> = ({ meal }) => {
    const { user } = useUserStore((state) => state)
    const [isOpen, setIsOpen] = useState(false)
    const [totalCalories, setTotalCalories] = useState(
        meal.foodEntries.reduce((acc, foodEntry) => acc + foodEntry.calories, 0)
    )
    const { incrementBy, decrementBy } = useFoodStore((state) => state)
    const openModal = () => setIsOpen(true)

    useEffect(() => {
        incrementBy(totalCalories)
        return () => decrementBy(totalCalories)
    }, [])

    const addFoodEntry = async (foodEntryData: Pick<FoodEntry, 'name' | 'calories' | 'mealId'>) => {
        if (!user) return
        const entry = await AddFoodEntry(foodEntryData, user.id)
        const newEntries = [...meal.foodEntries, entry]
        meal.foodEntries = newEntries
        setTotalCalories(newEntries.reduce((acc, foodEntry) => acc + foodEntry.calories, 0))
        incrementBy(entry.calories)
    }

    const removeFoodEntry = async (entry: FoodEntry) => {
        await DeleteFoodEntry(entry.id)
        const newEntries = meal.foodEntries.filter((e) => e.id !== entry.id)
        meal.foodEntries = newEntries
        setTotalCalories(newEntries.reduce((acc, foodEntry) => acc + foodEntry.calories, 0))
        decrementBy(entry.calories)
    }

    const onFoodEntryUpdate = (foodEntry: FoodEntry) => {
        const newEntries = meal.foodEntries.map((e) => (e.id === foodEntry.id ? foodEntry : e))
        meal.foodEntries = newEntries
        setTotalCalories(newEntries.reduce((acc, foodEntry) => acc + foodEntry.calories, 0))
    }

    const mealWithoutEntries = { ...meal, foodEntries: [] }

    return (
        <div className={'flex flex-col gap-6 w-full rounded-xl border-[1px] p-4'}>
            <FoodEntryForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                submitFoodEntry={addFoodEntry}
                mealId={meal.id}
                mealName={meal.name}
            />
            <div className={'flex justify-between items-center'}>
                <DataWithIcon icon={meal.icon} title={meal.name} subTitle={`${totalCalories} cal`} />
                <button onClick={openModal}>
                    <FontAwesomeIcon icon={faCirclePlus} className={'text-primary text-3xl'} />
                </button>
            </div>
            <div className={'flex flex-col gap-3'}>
                {meal.foodEntries.map((foodEntry, index) => (
                    <MealEntry
                        key={`foodEntry-${meal.name}-${index}`}
                        meal={mealWithoutEntries}
                        onDelete={() => removeFoodEntry(foodEntry)}
                        foodEntry={foodEntry}
                        onUpdate={onFoodEntryUpdate}
                    />
                ))}
            </div>
        </div>
    )
}

export default MealPanel
