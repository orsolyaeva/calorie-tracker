import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSquarePen } from '@fortawesome/free-solid-svg-icons'
import { FoodEntry } from '@prisma/client'
import { useUserStore } from '@stores/userStore'
import { FoodEntryForm } from './foodEntryForm'
import { Meal } from '@models/Meal'
import { UpdateFoodEntry } from '@services/FoodService'
import { useFoodStore } from '@stores/foodStore'

type MealEntryProps = { meal: Meal; foodEntry: FoodEntry; onUpdate: (entry: FoodEntry) => void; onDelete: () => void }

const MealEntry: FC<MealEntryProps> = ({ meal, foodEntry, onUpdate, onDelete }) => {
    const { user } = useUserStore((state) => state)
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const { incrementBy, decrementBy } = useFoodStore((state) => state)

    const updateFoodEntry = async (foodEntryData: Pick<FoodEntry, 'name' | 'calories' | 'mealId'>) => {
        if (!user) return

        foodEntry.name = foodEntryData.name

        if (foodEntryData.calories !== foodEntry.calories) {
            if (foodEntryData.calories > foodEntry.calories) {
                const diff = foodEntryData.calories - foodEntry.calories
                incrementBy(diff)
            } else {
                const diff = foodEntry.calories - foodEntryData.calories
                decrementBy(diff)
            }
        }

        foodEntry.calories = foodEntryData.calories

        await UpdateFoodEntry(foodEntry)
        onUpdate(foodEntry)
    }

    return (
        <div className={'flex w-full rounded-lg p-4 bg-lightBlue justify-between items-center'}>
            <FoodEntryForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                submitFoodEntry={updateFoodEntry}
                mealId={meal.id}
                mealName={meal.name}
                entry={foodEntry}
            />
            <div className={'flex flex-col'}>
                <div className={'text-secondary font-semibold text-base'}>{foodEntry.name}</div>
                <div className={'text-wildBlue text-xs font-medium'}>{`${foodEntry.calories} calories`}</div>
            </div>
            <div className={'flex items-center justify-center gap-6'}>
                <button onClick={openModal} aria-label={`Edit ${meal.name}`}>
                    <FontAwesomeIcon icon={faSquarePen} className={'text-wildBlue text-lg'} />
                </button>
                <button onClick={onDelete} aria-label={`Remove ${meal.name}`}>
                    <FontAwesomeIcon icon={faTrash} className={'text-wildBlue text-lg'} />
                </button>
            </div>
        </div>
    )
}

export default MealEntry
