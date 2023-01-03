import axios from "axios"
import { API_LOGIN, API_USER_ONBOARD } from "../utils/constants"

export const OnboardUser = async (onboardingData: any) => {
    try {
        const response = await axios.post(API_USER_ONBOARD, onboardingData);
        return response.data;
    } catch (error) {
        return null;
    }
}

export const LoginUserByEmail = async (email: string) => {
    const {data} = await axios.get(`${API_LOGIN}/${email}`);
    data.goalDate = new Date(data.goalDate);
    data.birthDate = new Date(data.birthDate);
    return data;
}

export const LoginUser = async (email: string, accessToken: string) => {
    const {data} = await axios.post(API_LOGIN, {
        accessToken,
        email,
    })
    data.goalDate = new Date(data.goalDate);
    data.birthDate = new Date(data.birthDate);
    return data;
}