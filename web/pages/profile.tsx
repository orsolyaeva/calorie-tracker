import { AuthWrapper } from '@components/authWrapper'
import { FormModal } from '@components/formModal'
import InformationPanel from '@components/informationPanel'
import { UserDataForm } from '@components/userDataForm'
import { OnboardUser } from '@services/UserService'
import { useUserStore } from '@stores/userStore'
import { NextPage } from 'next'
import { FC, useState } from 'react'

const EditUserForm: FC<{ defaultValues: any; onFormSubmitted: any }> = ({ defaultValues, onFormSubmitted }) => {
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const onSubmit = async (data: any) => {
        await onFormSubmitted(data)
        closeModal()
    }

    return (
        <div className="flex flex-col gap-4">
            <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <h1 className="text-xl text-primary font-semibold mb-4">Edit profile</h1>
                <UserDataForm
                    onFormSubmitted={onSubmit}
                    defaultValues={defaultValues}
                    className="flex flex-col gap-2"
                />
            </FormModal>
            <button onClick={openModal} className="bg-primary text-white font-medium py-2 px-4 rounded-md w-fit">
                Edit profile
            </button>
        </div>
    )
}

const Profile: NextPage = () => {
    const { user } = useUserStore((state) => state)

    if (!user) return <div>Not logged in</div>

    const onFormSubmitted = async (data: any) => {
        const result = await OnboardUser(data)
        if (result) {
            useUserStore.setState({ user: { ...user, ...result, name: user.name } })
        }
    }

    return (
        <AuthWrapper>
            <div className="px-8 gap-10 py-4">
                <div className="flex gap-10 mb-6 flex-col md:flex-row">
                    <InformationPanel title={'User data'}>
                        <div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1 mb-2">
                                    <div className="text-primary font-medium">Name</div>
                                    <div className="text-slate-500 font-medium">{user.name}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-primary font-medium">Email</div>
                                    <div className="text-slate-500 font-medium">{user.email}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-primary font-medium">Height</div>
                                    <div className="text-slate-500 font-medium">{user.height}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-primary font-medium">Age</div>
                                    <div className="text-slate-500 font-medium">{user.age}</div>
                                </div>
                            </div>
                        </div>
                    </InformationPanel>
                    <InformationPanel title={'Progress'}>
                        <div className="flex flex-col gap-1 mb-2">
                            <div className="text-primary font-medium">Current weight</div>
                            <div className="text-slate-500 font-medium">{user.currentWeight}</div>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <div className="text-primary font-medium">Goal weight</div>
                            <div className="text-slate-500 font-medium">{user.goalWeight}</div>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            <div className="text-primary font-medium">Weekly goal</div>
                            <div className="text-slate-500 font-medium">{user.weeklyGoal} kg</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-primary font-medium">Should finish by</div>
                            <div className="text-slate-500 font-medium">{user.goalDate.toDateString()}</div>
                        </div>
                    </InformationPanel>
                </div>
                {user && (
                    <EditUserForm
                        onFormSubmitted={onFormSubmitted}
                        defaultValues={{
                            currentWeight: user.currentWeight,
                            goalWeight: user.goalWeight,
                            age: user.age,
                            height: user.height,
                            gender: user.gender ? 1 : 0,
                            activityLevel: user.activityLevel,
                            weeklyGoal: user.weeklyGoal,
                        }}
                    />
                )}
            </div>
        </AuthWrapper>
    )
}

export default Profile
