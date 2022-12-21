import { FC, ReactNode } from 'react'

type DashboardLayoutProps = { children: ReactNode }

export const SideColumn: FC<DashboardLayoutProps> = ({ children }) => {
    return <div className={'flex flex-col w-1/4 gap-8'}>{children}</div>
}

export const MainColumn: FC<DashboardLayoutProps> = ({ children }) => {
    return <div className={'flex flex-col w-2/4 gap-8'}>{children}</div>
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    return <div className={'flex w-full px-8 gap-10 py-4'}>{children}</div>
}
