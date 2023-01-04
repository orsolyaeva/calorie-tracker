import { FC } from 'react'
import Image from 'next/image'

type DataWithIconProps = { icon: string; title: string; subTitle: string }

const DataWithIcon: FC<DataWithIconProps> = ({ icon, title, subTitle }) => {
    return (
        <div className={'flex gap-4 items-center justify-center'}>
            <div className={'flex h-12 w-12 bg-lightBlue p-3 text-lg rounded-full  items-center justify-center'}>
                {icon}
            </div>
            <div>
                <div className={'text-primary font-semibold'}>{title}</div>
                <div className={'text-sm text-secondary font-medium'}>{subTitle}</div>
            </div>
        </div>
    )
}

export default DataWithIcon
