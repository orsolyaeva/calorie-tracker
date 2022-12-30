import { NextPage } from 'next'
import { useEffect } from 'react'
import { useFirebaseContext } from '../hooks/useFirebase'
import { useRouter } from 'next/router'

const Logout: NextPage = () => {
    const { logout } = useFirebaseContext()
    const router = useRouter()

    useEffect(() => {
        logout()
        router.push('/')
    }, [])
    return <></>
}

export default Logout
