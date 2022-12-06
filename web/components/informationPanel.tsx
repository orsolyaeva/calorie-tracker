import { FC, ReactNode } from 'react'
import Image from 'next/image'

type InformationPanelProps = { title: string; icon: string; headerChild?: JSX.Element; children: ReactNode }

const InformationPanel: FC<InformationPanelProps> = ({ title, icon, headerChild, children }) => {
    return (
        <div className={'flex flex-col gap-6 w-full rounded-xl border-[1px] p-4'}>
            <div className={'flex justify-between items-center'}>
                <div className={'flex items-center gap-4'}>
                    <Image height={32} width={32} src={icon} alt={title} />
                    <h2 className={'text-lg text-primary font-semibold tracking-wide'}>{title}</h2>
                </div>
                {headerChild}
            </div>
            <div>{children}</div>
        </div>
    )
}

export default InformationPanel
