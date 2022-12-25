export const API_URL = 'http://localhost:3000/api/'
export const API_LOGIN = API_URL + 'login'
export const API_WATER_INTAKE = API_URL + 'water/get/forInterval'
export const API_ADD_WATER_INTAKE = API_URL + 'water/add'
export const API_DELETE_WATER_LAST_TODAY = API_URL + 'water/delete/lastToday'
export const API_GET_WORKOUTS_FOR_INTERVAL = API_URL + 'workout/get/forInterval'
export const API_GET_WORKOUT_CATEGORIES = API_URL + 'workoutCategory/getAll'
export const API_ADD_WORKOUT = API_URL + 'workout/add'
export const API_DELETE_WORKOUT = API_URL + 'workout/delete'
export const API_USER_ONBOARD = API_URL + 'user/onboard'

export enum FieldOptions {
    WaterIntake = 'WaterIntake',
    GoogleData = 'GoogleData',
}

export const withPadding = (duration: moment.Duration) => {
    if (duration.asDays() >= 1) {
        return 'at least one day'
    } else {
        return [
            ('0' + duration.hours()).slice(-2),
            ('0' + duration.minutes()).slice(-2),
            ('0' + duration.seconds()).slice(-2),
        ].join(':')
    }
}
