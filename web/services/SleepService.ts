import { API_ADD_SLEEP, API_GET_SLEEP, API_UPDATE_SLEEP } from '@utils/constants';
import { SleepEntry } from "@prisma/client";
import axios from "axios";

export const GetUserSleepForInterval = async (startDate: Date, endDate: Date, userId: number) : Promise<SleepEntry | null> => {
    try {
        const result = await axios.post(`${API_GET_SLEEP}`, {
            startTime: startDate.toISOString(),
            endTime: endDate.toISOString(),
            userId
        });
        return result.data ? result.data[0] : null;
    } catch (e) {
        return null;
    }
}

export const AddSleepEntry = async (sleepEntry: Omit<SleepEntry, 'id'>) => {
    try {
        const result = await axios.post(`${API_ADD_SLEEP}`, sleepEntry);
        return result.data;
    } catch (e) {
        throw e;
    }
}

export const UpdateSleepEntry = async (sleepEntry: SleepEntry) => {
    try {
        const result = await axios.put(`${API_UPDATE_SLEEP}`, sleepEntry);
        return result.data;
    } catch (e) {
        throw e;
    }
}