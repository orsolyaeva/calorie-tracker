import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFirebaseContext } from '../hooks/useFirebase'
import Dropdown from './dropdown'

type MenuItemProps = { href: string; text: string }

const MenuItem: FC<MenuItemProps> = ({ href, text }) => {
    const router = useRouter()
    const isActive = router.asPath === href
    return (
        <Link
            href={href}
            className={`${isActive ? 'text-slate-800' : 'text-slate-400'} uppercase tracking-widest font-medium`}
        >
            {text}
        </Link>
    )
}

const Header: FC = () => {
    const { state: firebase, login, logout } = useFirebaseContext()

    return (
        <header className="flex px-8 py-6 items-center justify-between">
            <Image src={'/logo.svg'} alt={'logo'} width={106} height={30} />
            <nav className="flex gap-16">
                <MenuItem href={'/'} text={'Home'} />
                <MenuItem href={'/tracker'} text={'Tracker'} />
                <MenuItem href={'/blog'} text={'Blog'} />
                <MenuItem href={'/about-us'} text={'About us'} />
            </nav>
            <div>
                {firebase.user ? (
                    <Dropdown
                        align={'right'}
                        clickableElement={
                            <Image
                                src={firebase.user.photoURL}
                                alt={'profile picture'}
                                className="rounded-full"
                                width={36}
                                height={36}
                            />
                        }
                    >
                        <button onClick={logout}>Log out</button>
                        <Link href={'/profile'}>Profile</Link>
                    </Dropdown>
                ) : (
                    <button
                        className={
                            'p-2 px-8 bg-blue-900 text-white uppercase text-sm tracking-widest font-medium rounded-3xl'
                        }
                        onClick={login}
                    >
                        Sign in
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header