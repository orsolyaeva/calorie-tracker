import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSquarePen } from '@fortawesome/free-solid-svg-icons'

type MealEntryProps = { name: string; calories: string }

const MealEntry: FC<MealEntryProps> = ({ name, calories }) => {
    return (
        <div className={'flex w-full rounded-lg p-4 bg-lightBlue justify-between items-center'}>
            <div className={'flex flex-col'}>
                <div className={'text-secondary font-semibold text-base'}>{name}</div>
                <div className={'text-wildBlue text-xs font-medium'}>{calories}</div>
            </div>
            <div className={'flex items-center justify-center gap-6'}>
                <button>
                    <FontAwesomeIcon icon={faSquarePen} className={'text-wildBlue text-lg'} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faTrash} className={'text-wildBlue text-lg'} />
                </button>
            </div>
        </div>
    )
}

export default MealEntry
