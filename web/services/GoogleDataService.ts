import axios from 'axios'

export const GetGoogleData = async (startDate: Date, endDate: Date, accessToken: string) => {
    try {
        const response = await axios.post(
            'https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate',
            {
                startTimeMillis: startDate.getTime(),
                endTimeMillis: endDate.getTime(),
                aggregateBy: [
                    {
                        dataTypeName: 'com.google.step_count',
                        dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
                    },
                    {
                        dataTypeName: 'com.google.distance.delta',
                    },
                    {
                        dataTypeName: 'com.google.calories.expended',
                    },
                    {
                        dataTypeName: 'com.google.active_minutes',
                    },
                ],
                bucketByTime: {
                    period: {
                        type: 'day',
                        value: 1,
                        timeZoneId: 'Europe/Bucharest',
                    },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        const data = response.data.bucket[0]

        return {
            steps: data.dataset[0].point.reduce(
                (prev: any, curr: { value: { intVal: any }[] }) => prev + curr.value[0].intVal,
                0
            ),
            distance: data.dataset[1].point.reduce(
                (prev: any, curr: { value: { fpVal: any }[] }) => prev + curr.value[0].fpVal,
                0
            ),
            calories: data.dataset[2].point.reduce(
                (prev: any, curr: { value: { fpVal: any }[] }) => prev + curr.value[0].fpVal,
                0
            ),
            activeMinutes: data.dataset[3].point.reduce(
                (prev: any, curr: { value: { intVal: any }[] }) => prev + curr.value[0].intVal,
                0
            ),
        }
    } catch (e: any) {
        throw new Error(e)
    }
}
