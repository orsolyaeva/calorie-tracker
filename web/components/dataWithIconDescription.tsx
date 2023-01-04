import { FC } from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type DataWithIconDescription = { icon: IconProp; title: string; description: string }

const DataWithIconDescription: FC<DataWithIconDescription> = ({ icon, title, description }) => {
    return (
        <div className={'flex bg-white w-1/3 rounded-xl p-6 justify-between items-center'}>
            <div className={'flex flex-col gap-2 justify-center items-start'}>
                <div className={'flex gap-4 items-center justify-center'}>
                    <div
                        className={'flex h-12 w-12 bg-lightBlue p-3 text-lg rounded-full  items-center justify-center'}
                    >
                        <FontAwesomeIcon icon={icon} className={'text-primary text-lg'} />
                    </div>
                    <div>
                        <div className={'text-primary font-semibold'}>{title}</div>
                    </div>
                </div>
                <div className={'text-wildBlue'}>{description}</div>
            </div>
        </div>
    )
}

export default DataWithIconDescription
