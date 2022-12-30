import axios from 'axios'
import { API_USER_ONBOARD } from '../utils/constants'

export const OnboardUser = async (onboardingData: any) => {
    try {
        const response = await axios.post(API_USER_ONBOARD, onboardingData)
        return response.data
    } catch (error) {
        return null
    }
}
