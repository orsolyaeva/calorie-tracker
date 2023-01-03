import { FC } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { AddWaterIntake, RemoveLastWaterIntakeToday } from '../services/WaterIntakeService'
import { useWaterIntakeStore } from '@stores/waterIntakeStore'
import { useUserStore } from '@stores/userStore'

const WaterIntakePanel: FC = () => {
    const { amount } = useWaterIntakeStore((state: any) => state)
    const { user } = useUserStore((state: any) => state)

    const AddGlassOfWater = async (userId: number) => {
        await AddWaterIntake(250, userId)
        // refetch(FieldOptions.WaterIntake);
        useWaterIntakeStore.setState({ amount: amount + 250 })
    }

    const RemoveGlassOfWater = async (userId: number) => {
        await RemoveLastWaterIntakeToday(userId)
        // refetch(FieldOptions.WaterIntake);
        useWaterIntakeStore.setState({ amount: amount - 250 })
    }

    return (
        <div className={'flex gap-6 w-full rounded-xl border-[1px] p-4 justify-between'}>
            <div className={'flex gap-3 justify-center items-center'}>
                <Image height={34} width={34} src={'/glass-of-water.png'} alt={'Glass of water'} />
                <h2 className={'text-lg text-primary font-medium tracking-wide'}>{`${amount} ml`}</h2>
            </div>
            <div className={'flex gap-4 justify-center items-center'}>
                <button
                    onClick={() => {
                        RemoveGlassOfWater(user.id)
                    }}
                >
                    <FontAwesomeIcon icon={faCircleMinus} className={'text-secondary text-xl'} />
                </button>
                <div className={'text-primary font-medium'}>{Math.round(amount / 250)} glass</div>
                <button
                    onClick={() => {
                        AddGlassOfWater(user.id)
                    }}
                >
                    <FontAwesomeIcon icon={faCirclePlus} className={'text-secondary text-xl'} />
                </button>
            </div>
        </div>
    )
}

export default WaterIntakePanel
