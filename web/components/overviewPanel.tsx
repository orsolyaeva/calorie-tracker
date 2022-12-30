import { FC } from 'react'
import { useFirebaseContext } from '../hooks/useFirebase'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import DataWithIcon from './dataWithIcon'

const OverviewPanel: FC = () => {
    const { state } = useFirebaseContext()

    return (
        <div className={'flex flex-col gap-6 w-full rounded-xl border-[1px] p-4'}>
            <div className={'flex justify-between items-center'}>
                <div className={'pr-1 basis-1/5'}>
                    <CircularProgressbarWithChildren
                        styles={{ trail: { stroke: '#F7FAFF' }, path: { stroke: '#00b158' } }}
                        value={(800 * 100) / 1320}
                        strokeWidth={6}
                    >
                        <div className={'flex flex-col justify-center items-center'}>
                            <div className={'text-2xl font-bold text-primary'}>520</div>
                            <div className={'text-wildBlue font-medium'}>remaining</div>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className={'flex w-full flex-col justify-center basis-4/5 gap-8 px-4 pr-2'}>
                    <div className={'flex justify-between items-center'}>
                        <div className={'text-base text-primary font-semibold'}>Calorie tracker details</div>
                        <div className={'text-base text-wildBlue font-medium'}>Remaining = Goal - Food + Exercise</div>
                    </div>
                    <div className={'flex flex gap-4 items-start justify-between'}>
                        <DataWithIcon icon={'🎯'} title={'1320 Cal'} subTitle={'Base Goal'} />
                        <DataWithIcon icon={'🍳'} title={'410 Cal'} subTitle={'Food'} />
                        <DataWithIcon icon={'🔥'} title={'410 Cal'} subTitle={'Exercise'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewPanel
