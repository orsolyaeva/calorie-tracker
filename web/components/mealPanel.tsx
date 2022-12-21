import { FC, ReactNode } from 'react'
import { useFirebaseContext } from '../hooks/useFirebase'
import DataWithIcon from './dataWithIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

type MealPanelProps = { title: string; subtitle: string; icon: string; children: ReactNode }

const MealPanel: FC<MealPanelProps> = ({ title, subtitle, icon, children }) => {
    const { state } = useFirebaseContext()

    return (
        <div className={'flex flex-col gap-6 w-full rounded-xl border-[1px] p-4'}>
            <div className={'flex justify-between items-center'}>
                <DataWithIcon icon={icon} title={title} subTitle={subtitle} />
                <button>
                    <FontAwesomeIcon icon={faCirclePlus} className={'text-primary text-3xl'} />
                </button>
            </div>
            <div className={'flex flex-col gap-3'}>{children}</div>
        </div>
    )
}

export default MealPanel
