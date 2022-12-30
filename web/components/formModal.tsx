import { FC, ReactNode, useState } from 'react'

export const FormModal: FC<{ children: ReactNode; isOpen: boolean; setIsOpen: any }> = ({
    children,
    isOpen,
    setIsOpen,
    ...props
}) => {
    const closeModal = () => setIsOpen(false)

    return (
        <>
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
                    isOpen ? 'block' : 'hidden'
                }`}
            >
                <div className="relative w-11/12 max-w-2xl p-6 bg-white rounded-xl">
                    <button
                        className="absolute top-0 right-0 py-2 px-3 text-2xl font-bold text-gray-400 transition duration-200 transform rounded-full hover:text-gray-500 hover:scale-105"
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        </>
    )
}
