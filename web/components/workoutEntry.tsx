import { FC } from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type WorkoutEntryProps = { name: string; time: string; calories: string; type: string }

const WorkoutEntry: FC<WorkoutEntryProps> = ({ name, time, calories, type }) => {
    return (
        <div className={'flex gap-6 w-full rounded-lg p-4 bg-lightBlue justify-between items-center'}>
            <div className={'flex flex-col'}>
                <div className={'text-secondary font-medium text-base'}>{name}</div>
                <div className={'text-wildBlue text-xs font-medium'}>{time}</div>
            </div>
            <div className={'flex items-center justify-center gap-6'}>
                <div className={'flex flex-col items-end'}>
                    <div className={'text-secondary font-semibold text-base'}>{calories}</div>
                    <div className={'text-wildBlue text-xs font-medium'}>{type}</div>
                </div>
                <button>
                    <FontAwesomeIcon icon={faTrash} className={'text-wildBlue text-lg'} />
                </button>
            </div>
        </div>
    )
}

export default WorkoutEntry
