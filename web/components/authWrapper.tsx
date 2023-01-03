import { GetGoogleData } from "@services/GoogleDataService";
import { GetWaterIntakeForInterval } from "@services/WaterIntakeService";
import { useDateStore } from "@stores/dateStore";
import { useGoogleDataStore } from "@stores/googleDataStore";
import { useUserStore } from "@stores/userStore";
import { useWaterIntakeStore } from "@stores/waterIntakeStore";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";

const LoadingSpinner : FC = () => (
    <div style={{height: '100%'}} className="flex justify-center items-center w-full">
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
)

export const AuthWrapper : FC<{children: ReactNode}> = ({ children }) => {
    const { user, accessToken, dataLoaded, isLoading } = useUserStore((state: any) => state)
    const router = useRouter()

    useEffect(() => {
        if (!accessToken) return;
        ;(async () => {
            const startDate = new Date()
            startDate.setHours(0, 0, 0, 0)
            const endDate = new Date()
            useDateStore.setState({startDate, endDate})


            try {
                const googleData = await GetGoogleData(startDate, endDate, accessToken);
                useGoogleDataStore.setState(googleData);
            } catch (e) {
                router.push('/logout')
            }
            const waterIntake = await GetWaterIntakeForInterval(startDate, endDate, user.id)
            useWaterIntakeStore.setState({amount: waterIntake})

            useUserStore.setState({dataLoaded: true})
        })()
    }, [accessToken])

    return (<>
    {
        isLoading ? <LoadingSpinner /> :
        user ? (dataLoaded ? children : <LoadingSpinner />) : 
        (<div style={{height: '100%'}} className="flex justify-center items-center w-full">You are not logged in</div>)
    }
    </>)
}