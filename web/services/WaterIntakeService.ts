import axios from "axios"
import { API_ADD_WATER_INTAKE, API_DELETE_WATER_LAST_TODAY, API_WATER_INTAKE } from "../utils/constants"

// TODO: Edit backend endpoint to return the entries for specific user and update this function
export const GetWaterIntakeForInterval = async (startDate: Date, endDate: Date, userId: number) : Promise<number> => {
    try {
        const waterIntake = (
            await axios.post(`${API_WATER_INTAKE}`, {
                startTime: startDate.toISOString(),
                endTime: endDate.toISOString(),
                userId,
            })
        ).data
        if (waterIntake.length) {
            const totalAmount = waterIntake.reduce((acc: number, curr: any) => acc + curr.amount, 0)
            if (totalAmount < 0) {
                return 0;
            } else {
                return totalAmount;
            }
        } else {
            return 0;
        }
    } catch (e) {
        return 0;
    }
}

export const AddWaterIntake = async (amount: number, userId: number) : Promise<boolean> => {
    try {
        await axios.post(`${API_ADD_WATER_INTAKE}`, {
            amount,
            userId
        })
        return true
    } catch (e) {
        return false
    }
}

export const RemoveLastWaterIntakeToday = async (userId: number) : Promise<boolean> => {
    try {
        await axios.delete(`${API_DELETE_WATER_LAST_TODAY}`, {
            data: {
                userId
            }
        })
        return true
    } catch (e) {
        return false
    }
}