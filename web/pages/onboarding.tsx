import { useUserStore } from '@stores/userStore'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UserDataForm } from '../components/userDataForm'
import { OnboardUser } from '../services/UserService'

const Onboarding: NextPage = () => {
    // const { state, setUserIsLoaded, refetchAll } = useFirebaseContext();
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
        <div>
            {/* {state.user && <UserDataForm onFormSubmitted={onFormSubmitted} defaultValues={{
                currentWeight: state.user.currentWeight,
            }} />} */}
            <UserDataForm onFormSubmitted={onFormSubmitted} />
        </div>
    )
}

export default Onboarding
