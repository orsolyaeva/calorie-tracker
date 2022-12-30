import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UserDataForm } from '../components/userDataForm'
import { useFirebaseContext } from '../hooks/useFirebase'
import { OnboardUser } from '../services/UserService'

const Onboarding: NextPage = () => {
    const { state } = useFirebaseContext()
    const router = useRouter()

    useEffect(() => {
        if (!state.user) return
        console.log({ user: state.user })
        if (state.user.finishedOnboarding) {
            router.push('/dashboard')
        }
    }, [state.user])

    const onFormSubmitted = async (data: any) => {
        const result = await OnboardUser(data)
        if (result) {
            router.push('/dashboard')
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
