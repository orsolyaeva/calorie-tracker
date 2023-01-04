import { API_UPDATE_FOOD_ENTRY } from './../utils/constants';
import { Meal } from "@models/Meal";
import { FoodEntry } from "@prisma/client";
import { API_ADD_FOOD_ENTRY, API_DELETE_FOOD_ENTRY, API_GET_MEALS } from "@utils/constants";
import axios from "axios";

export const AddFoodEntry = async (foodEntry: Pick<FoodEntry, 'name' | 'calories' | 'mealId'>, userId: number) => {
    try {
        const result = await axios.post(`${API_ADD_FOOD_ENTRY}`, {
            ...foodEntry,
            userId
        });
        return result.data;
    } catch (e) {
        throw e;
    }
}

export const DeleteFoodEntry = async (foodEntryId: number) => {
    try {
        const result = await axios.delete(`${API_DELETE_FOOD_ENTRY}/${foodEntryId}`);
        return result.data;
    } catch (e) {
        throw e;
    }
}

export const UpdateFoodEntry = async (foodEntry: FoodEntry) => {
    try {
        const result = await axios.put(`${API_UPDATE_FOOD_ENTRY}`, foodEntry);
        return result.data;
    } catch (e) {
        throw e;
    }
}

export const GetMeals = async (startDate: Date, endDate: Date, userId: number) : Promise<Meal[]> => {
    try {
        const result = await axios.post(API_GET_MEALS, {
            startTime: startDate.toISOString(),
            endTime: endDate.toISOString(),
            userId
        });
        return result.data;
    } catch (e) {
        return [];
    }
}