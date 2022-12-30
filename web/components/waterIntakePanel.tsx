import { FC, useEffect } from 'react'
import { useFirebaseContext } from '../hooks/useFirebase'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { AddWaterIntake, RemoveLastWaterIntakeToday } from '../services/WaterIntakeService'
import { FieldOptions } from '../utils/constants'

const WaterIntakePanel: FC = () => {
    const { state, refetch } = useFirebaseContext()

    useEffect(() => {}, [state.accessToken])

    const AddGlassOfWater = async (userId: number) => {
        await AddWaterIntake(250, userId)
        refetch(FieldOptions.WaterIntake)
    }

    const RemoveGlassOfWater = async (userId: number) => {
        await RemoveLastWaterIntakeToday(userId)
        refetch(FieldOptions.WaterIntake)
    }

    return (
        <div className={'flex gap-6 w-full rounded-xl border-[1px] p-4 justify-between'}>
            <div className={'flex gap-3 justify-center items-center'}>
                <Image height={34} width={34} src={'/glass-of-water.png'} alt={'Glass of water'} />
                <h2 className={'text-lg text-primary font-medium tracking-wide'}>{`${state.waterIntake} ml`}</h2>
            </div>
            <div className={'flex gap-4 justify-center items-center'}>
                <button
                    onClick={() => {
                        RemoveGlassOfWater(state.user.id)
                    }}
                >
                    <FontAwesomeIcon icon={faCircleMinus} className={'text-secondary text-xl'} />
                </button>
                <div className={'text-primary font-medium'}>{Math.round(state.waterIntake / 250)} glass</div>
                <button
                    onClick={() => {
                        AddGlassOfWater(state.user.id)
                    }}
                >
                    <FontAwesomeIcon icon={faCirclePlus} className={'text-secondary text-xl'} />
                </button>
            </div>
        </div>
    )
}

export default WaterIntakePanel
