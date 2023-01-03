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

const auth = useFirebaseStore.getState().auth;
const user = useUserStore.getState().user;

if (typeof window !== 'undefined') {
    onAuthStateChanged(auth, (authUser) => {
        console.log('authUser', authUser)
        if (authUser && !user) {
            (async () => {
                if (!authUser.email) return;
                const data = (await LoginUserByEmail(authUser.email));
                const loadedAccessToken = data.accessToken
                const combinedUser = { ...data, photoURL: authUser.photoURL, name: authUser.displayName }
                useUserStore.setState({user: combinedUser, accessToken: loadedAccessToken, isLoading: false});
            })()
        } else if (!authUser) {
            useUserStore.setState({isLoading: false});
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
            router.push('/onboarding');
            return;
        }
    }, [user])

    useEffect(() => {
        (async () => {
            const result = await getRedirectResult(auth)
            if (result) {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const loadedAccessToken = credential?.accessToken

                if (loadedAccessToken && result.user?.email) {
                    const user = await LoginUser(result.user.email, loadedAccessToken);
                    const combinedUser = { ...user, photoURL: user.photoURL, name: result.user?.displayName }

                    if (!user.finishedOnboarding) {
                        useUserStore.setState({user: combinedUser, accessToken: loadedAccessToken, isLoading: false});
                        router.push('/onboarding');
                        return;
                    }
                }

                router.push('/dashboard');
            }
        })()
    }, [])

    return (
        <header className={`flex px-8 py-6 items-center justify-between w-full md:flex-row flex-col z-10`}>
            <Image src={'/logo.svg'} alt={'logo'} width={106} height={30} />
            
            <button className={`text-2xl md:hidden`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span className={`${isMenuOpen ? 'hidden' : 'block'}`}>
                    <FontAwesomeIcon icon={faBars}  />
                </span>

                <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </button>
            <nav className={`flex gap-16 h-8 items-center md:flex-row flex-col md:flex ${isMenuOpen ? 'flex' : 'hidden'}`}>
                <MenuItem href={'/'} text={'Home'} />
                <MenuItem href={'/dashboard'} text={'Dashboard'} />
                <MenuItem href={'/blog'} text={'Blog'} />
                <MenuItem href={'/about-us'} text={'About us'} />
            </nav>
            <div className={`md:block ${isMenuOpen ? 'block' : 'hidden'}`}>
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
        </header>
    )
}

export default Header
