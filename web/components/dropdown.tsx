import { FC, ReactNode, useState } from 'react'
import style from './dropdown.module.css'

type DropdownProps = { clickableElement: JSX.Element; children: ReactNode; align?: 'left' | 'right' }

const Dropdown: FC<DropdownProps> = ({ clickableElement, children, align = 'left' }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={'relative'}>
            <button className={'cursor-pointer'} onClick={() => setIsOpen(!isOpen)}>
                {clickableElement}
            </button>
            <div
                className={`absolute flex flex-col w-max p-3 mt-4 border-[1px] bg-white rounded-xl ${
                    isOpen ? 'block' : 'hidden'
                } ${align === 'left' ? 'left-0' : 'right-0 items-end'} ${style.dropdownChildren}`}
            >
                {children}
            </div>
        </div>
    )
}

export default Dropdown
