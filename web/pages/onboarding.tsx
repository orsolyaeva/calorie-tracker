import { useUserStore } from '@stores/userStore'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UserDataForm } from '../components/userDataForm'
import { OnboardUser } from '../services/UserService'

const Onboarding: NextPage = () => {
    const { user } = useUserStore((state) => state)
    const router = useRouter()

    useEffect(() => {
        if (!user) return
        console.log({ user })
        if (user.finishedOnboarding) {
            router.push('/dashboard')
        }
    }, [user])

    const onFormSubmitted = async (data: any) => {
        const result = await OnboardUser(data)
        if (result) {
            await router.push('/dashboard')
        }
    }

    return (
        <div className="flex justify-center w-full">
            <UserDataForm onFormSubmitted={onFormSubmitted} className="flex flex-col px-8 gap-2 w-1/2" />
        </div>
    )
}

export default Onboarding
