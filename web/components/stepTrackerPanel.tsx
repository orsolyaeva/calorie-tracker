import { FC } from 'react'
import InformationPanel from './informationPanel'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import DataWithIcon from './dataWithIcon'
import moment from 'moment'
import 'moment-duration-format'
import { useGoogleDataStore } from '@stores/googleDataStore'

const StepTrackerPanel: FC = () => {
    const { distance, steps, activeMinutes, calories } = useGoogleDataStore((state: any) => state)

    return (
        <InformationPanel title={'Step tracker'} icon={'/run.png'}>
            <div className={'flex gap-3 justify-between items-center'}>
                <div className={'pr-4 basis-1/2'}>
                    <CircularProgressbarWithChildren
                        styles={{ trail: { stroke: '#F7FAFF' }, path: { stroke: '#01CAFF' } }}
                        value={(steps * 100) / 10000}
                        strokeWidth={6}
                    >
                        <div className={'flex flex-col justify-center items-center'}>
                            <div className={'text-2xl font-bold text-primary'}>{steps}</div>
                            <div className={'text-wildBlue font-medium'}>steps</div>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className={'flex flex-col basis-1/2 gap-4 items-start justify-start'}>
                    <DataWithIcon icon={'🏁'} title={`${(distance / 1000).toFixed(2)} km`} subTitle={'Distance'} />
                    <DataWithIcon
                        icon={'⏰'}
                        title={moment.duration(activeMinutes, 'minutes').format('h [h] m [m]')}
                        subTitle={'Time spent'}
                    />
                    <DataWithIcon icon={'🔥'} title={`${calories.toFixed(2)}`} subTitle={'Calories'} />
                </div>
            </div>
        </InformationPanel>
    )
}

export default StepTrackerPanel
