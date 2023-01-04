import { NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserStore } from '@stores/userStore'
import { useFirebaseStore } from '@stores/firebaseStore'
import { signOut } from 'firebase/auth'

const Logout: NextPage = () => {
    const { user } = useUserStore((state: any) => state)
    const { auth } = useFirebaseStore((state: any) => state)
    const router = useRouter()

    useEffect(() => {
        ;(async () => {
            console.log('You are logged out!')
            await signOut(auth)
            useUserStore.setState({ user: null, accessToken: null, isLoading: false })
            router.push('/')
        })()
    }, [])

    return <></>
}

export default Logout
