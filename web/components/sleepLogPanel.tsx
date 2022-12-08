import { FC } from 'react'
import InformationPanel from './informationPanel'
import { useFirebaseContext } from '../hooks/useFirebase'
import Image from 'next/image'

const SleepLogPanel: FC = () => {
    const { state } = useFirebaseContext()

    return (
        <InformationPanel
            title={'Sleep Log'}
            icon={'/sleep.png'}
            headerChild={<div className={'text-primary font-medium'}>1h 34m</div>}
        >
            <div className={'flex justify-between items-center'}>
                <div className={'flex items-center gap-4'}>
                    <Image height={34} width={34} src={'/sleep-moon.png'} alt={'Went to sleep'} />
                    <div className={'flex flex-col'}>
                        <div className={'text-primary font-medium'}>23:00</div>
                        <div className={'text-sm text-wildBlue font-regular'}>went to sleep</div>
                    </div>
                </div>
                <div className={'flex items-center gap-4'}>
                    <Image height={36} width={36} src={'/sleep-sun.png'} alt={'Wake up'} />
                    <div className={'flex flex-col'}>
                        <div className={'text-primary font-medium'}>08:00</div>
                        <div className={'text-sm text-wildBlue font-regular'}>wake up</div>
                    </div>
                </div>
                <div>
                    <button>
                        <Image height={24} width={24} src={'/sleep-edit.png'} alt={'Edit'} />
                    </button>
                </div>
            </div>
        </InformationPanel>
    )
}

export default SleepLogPanel
