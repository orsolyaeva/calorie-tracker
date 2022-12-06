import { FC, useEffect, useState } from 'react'
import InformationPanel from './informationPanel'
import { useFirebaseContext } from '../hooks/useFirebase'
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import DataWithIcon from './dataWithIcon'

const StepTrackerPanel: FC = () => {
    const { state } = useFirebaseContext()

    return (
        <InformationPanel title={'Step tracker'} icon={'/run.png'}>
            <div className={'flex gap-3 justify-between items-center'}>
                <div className={'pr-4 basis-1/2'}>
                    <CircularProgressbarWithChildren
                        styles={{ trail: { stroke: '#F7FAFF' }, path: { stroke: '#01CAFF' } }}
                        value={(state.steps * 100) / 10000}
                        strokeWidth={6}
                    >
                        <div className={'flex flex-col justify-center items-center'}>
                            <div className={'text-2xl font-bold text-primary'}>{state.steps}</div>
                            <div className={'text-wildBlue font-medium'}>steps</div>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className={'flex flex-col basis-1/2 gap-4 items-start justify-start'}>
                    <DataWithIcon icon={'🏁'} title={'0.7km'} subTitle={'Distance'} />
                    <DataWithIcon icon={'⏰'} title={'1h 3m'} subTitle={'Time spent'} />
                    <DataWithIcon icon={'🔥'} title={'0.7km'} subTitle={'Calories'} />
                </div>
            </div>
        </InformationPanel>
    )
}

export default StepTrackerPanel
