import { FC, useState } from 'react'
import InformationPanel from './informationPanel'
import Image from 'next/image'
import { SleepEntry } from '@prisma/client'
import { useUserStore } from '@stores/userStore'
import { useEffect } from 'react'
import { GetUserSleepForInterval } from '@services/SleepService'
import moment from 'moment'
import 'moment-duration-format'
import { SleepForm } from './sleepForm'
import { useDateStore } from '@stores/dateStore'

const SleepLogPanel: FC = () => {
    const [sleepEntry, setSleepEntry] = useState<SleepEntry | null>(null)
    const [startTime, setStartTime] = useState<Date | null>(null)
    const { user } = useUserStore((state) => state)
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const { startDate, endDate } = useDateStore((state) => state)

    useEffect(() => {
        if (user) {
            ;(async () => {
                const result = await GetUserSleepForInterval(startDate, endDate, user.id)
                setSleepEntry(result)
            })()
        }
    }, [user])

    useEffect(() => {
        if (sleepEntry) {
            let date = new Date(sleepEntry.completedAt).getTime()
            date -= sleepEntry.duration * 3600000
            setStartTime(new Date(date))
        }
    }, [sleepEntry])

    return (
        <InformationPanel
            title={'Sleep Log'}
            icon={'/sleep.png'}
            headerChild={
                <div className={'text-primary font-medium'}>
                    {moment.duration(sleepEntry?.duration, 'hours').format('h [h] m [m]')}
                </div>
            }
        >
            <div className={'flex justify-between items-center'}>
                <SleepForm setSleep={setSleepEntry} isOpen={isOpen} setIsOpen={setIsOpen} entry={sleepEntry} />
                <div className={'flex items-center gap-4'}>
                    <Image height={34} width={34} src={'/sleep-moon.png'} alt={'Went to sleep'} />
                    <div className={'flex flex-col'}>
                        <div className={'text-primary font-medium'}>
                            {startTime ? moment(startTime).format('hh:mm') : '--:--'}
                        </div>
                        <div className={'text-sm text-wildBlue font-regular'}>went to sleep</div>
                    </div>
                </div>
                <div className={'flex items-center gap-4'}>
                    <Image height={36} width={36} src={'/sleep-sun.png'} alt={'Wake up'} />
                    <div className={'flex flex-col'}>
                        <div className={'text-primary font-medium'}>
                            {sleepEntry?.completedAt ? moment(sleepEntry.completedAt).format('hh:mm') : '--:--'}
                        </div>
                        <div className={'text-sm text-wildBlue font-regular'}>woke up</div>
                    </div>
                </div>
                <div>
                    <button onClick={openModal}>
                        <Image height={24} width={24} src={'/sleep-edit.png'} alt={'Edit'} />
                    </button>
                </div>
            </div>
        </InformationPanel>
    )
}

export default SleepLogPanel
