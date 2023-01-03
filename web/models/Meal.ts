import { FoodEntry } from '@prisma/client'

export type Meal = {
    id: number
    name: string
    icon: string
    foodEntries: FoodEntry[]
}
