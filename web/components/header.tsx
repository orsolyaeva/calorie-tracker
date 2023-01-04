import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Dropdown from './dropdown'
import { useUserStore } from '@stores/userStore'
import { useFirebaseStore } from '@stores/firebaseStore'
import { getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from 'firebase/auth'
import { LoginUser, LoginUserByEmail } from '@services/UserService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

type MenuItemProps = { href: string; text: string; className?: string }

const MenuItem: FC<MenuItemProps> = ({ href, text, className = '' }) => {
    const router = useRouter()
    const isActive = router.asPath === href
    return (
        <Link
            href={href}
            className={`${
                isActive ? 'text-slate-800' : 'text-slate-500'
            } ${className} uppercase tracking-widest font-medium`}
        >
            {text}
        </Link>
    )
}

const auth = useFirebaseStore.getState().auth
const user = useUserStore.getState().user

if (typeof window !== 'undefined') {
    onAuthStateChanged(auth, (authUser) => {
        console.log('authUser', authUser)
        if (authUser && !user) {
            ;(async () => {
                if (!authUser.email) return
                const data = await LoginUserByEmail(authUser.email)
                const loadedAccessToken = data.accessToken
                const combinedUser = { ...data, photoURL: authUser.photoURL, name: authUser.displayName }
                useUserStore.setState({ user: combinedUser, accessToken: loadedAccessToken, isLoading: false })
            })()
        } else if (!authUser) {
            useUserStore.setState({ isLoading: false })
        }
    })
}

const Header: FC = () => {
    const { user } = useUserStore((state: any) => state)
    const { auth, authProvider } = useFirebaseStore((state: any) => state)
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const login = async () => {
        await signInWithRedirect(auth, authProvider)
    }

    useEffect(() => {
        if (user && !user.finishedOnboarding) {
            router.push('/onboarding')
            return
        }
    }, [user])

    useEffect(() => {
        ;(async () => {
            const result = await getRedirectResult(auth)
            if (result) {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const loadedAccessToken = credential?.accessToken

                if (loadedAccessToken && result.user?.email) {
                    const user = await LoginUser(result.user.email, loadedAccessToken)
                    const combinedUser = { ...user, photoURL: user.photoURL, name: result.user?.displayName }

                    if (!user.finishedOnboarding) {
                        useUserStore.setState({ user: combinedUser, accessToken: loadedAccessToken, isLoading: false })
                        router.push('/onboarding')
                        return
                    }
                }

                router.push('/dashboard')
            }
        })()
    }, [])

    return (
        <header className="sticky top-0 z-10 md:static">
            <div className={`flex px-8 py-6 items-center justify-between w-full hidden md:flex`}>
                <Image src={'/logo.svg'} alt={'logo'} width={106} height={30} />
                <nav className={`flex gap-16 h-8 items-center`}>
                    <MenuItem href={'/'} text={'Home'} />
                    <MenuItem href={'/dashboard'} text={'Dashboard'} />
                    <MenuItem href={'/blog'} text={'Blog'} />
                    <MenuItem href={'/about-us'} text={'About us'} />
                </nav>
                <div>
                    {user ? (
                        <Dropdown
                            align={'right'}
                            clickableElement={
                                <Image
                                    src={user.photoURL}
                                    alt={'profile picture'}
                                    className="rounded-full"
                                    width={36}
                                    height={36}
                                />
                            }
                        >
                            <Link href={'/logout'}>Log out</Link>
                            <Link href={'/profile'}>Profile</Link>
                        </Dropdown>
                    ) : (
                        <button
                            className={
                                'p-1.5 px-8 bg-blue-900 text-white uppercase text-sm tracking-widest font-medium rounded-3xl'
                            }
                            onClick={login}
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </div>
            <div
                className={`flex flex-col px-8 py-6 items-center justify-between border-b-[1px] w-full shadow-md shadow-slate-400/10 md:hidden bg-white`}
            >
                <div className={`flex justify-between w-full`}>
                    <Image src={'/logo.svg'} alt={'logo'} width={106} height={30} />
                    <button className={`text-2xl text-primary`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className={`${isMenuOpen ? 'hidden' : 'block'}`}>
                            <FontAwesomeIcon icon={faBars} />
                        </span>

                        <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </button>
                </div>
                <nav
                    className={`flex bg-white h-8 py-2 flex-col w-full h-fit shadow-lg shadow-slate-400/20
                    border-t-[1px] absolute top-20 ${isMenuOpen ? 'flex' : 'hidden'}`}
                >
                    <MenuItem href={'/'} text={'Home'} className="w-full px-8 py-4 bg-white hover:bg-slate-100" />
                    <MenuItem
                        href={'/dashboard'}
                        text={'Dashboard'}
                        className="w-full px-8 py-4 bg-white hover:bg-slate-100"
                    />
                    <MenuItem href={'/blog'} text={'Blog'} className="w-full px-8 py-4 bg-white hover:bg-slate-100" />
                    <MenuItem
                        href={'/about-us'}
                        text={'About us'}
                        className="w-full px-8 py-4 bg-white hover:bg-slate-100"
                    />
                    {user ? (
                        <>
                            <MenuItem
                                href={'/logout'}
                                text={'Sign out'}
                                className="w-full px-8 py-4 bg-white hover:bg-slate-100"
                            />
                            <MenuItem
                                href={'/profile'}
                                text={'Profile'}
                                className="w-full px-8 py-4 bg-white hover:bg-slate-100"
                            />
                        </>
                    ) : (
                        <button
                            className={
                                'flex text-slate-500 w-full px-8 py-4 bg-white hover:bg-slate-100 uppercase tracking-widest font-medium'
                            }
                            onClick={login}
                        >
                            Sign in
                        </button>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
