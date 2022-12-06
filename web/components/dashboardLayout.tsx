import { FC, ReactNode } from 'react'

type DashboardLayoutProps = { children: ReactNode }

export const SideColumn: FC<DashboardLayoutProps> = ({ children }) => {
    return <div className={'w-1/5'}>{children}</div>
}

export const MainColumn: FC<DashboardLayoutProps> = ({ children }) => {
    return <div className={'w-3/5'}>{children}</div>
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    return <div className={'flex w-full px-8'}>{children}</div>
}
