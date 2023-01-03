import { AuthWrapper } from '@components/authWrapper'
import { useUserStore } from '@stores/userStore'
import { NextPage } from 'next'

const Profile: NextPage = () => {
    const { user } = useUserStore((state) => state)

    if (!user) return <div>Not logged in</div>

    return (
        <AuthWrapper>
            <div>
                <h1 className="text-primary text-xl font-medium">Profile</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-primary font-medium">Name</div>
                        <div className="text-slate-500 font-medium">{user.name}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-primary font-medium">Email</div>
                        <div className="text-slate-500 font-medium">{user.email}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-primary font-medium">Current weight</div>
                        <div className="text-slate-500 font-medium">{user.currentWeight}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-primary font-medium">Goal weight</div>
                        <div className="text-slate-500 font-medium">{user.goalWeight}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-primary font-medium">Weekly goal</div>
                        <div className="text-slate-500 font-medium">{user.weeklyGoal}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-primary font-medium">Should finish by</div>
                        <div className="text-slate-500 font-medium">{user.goalDate.toDateString()}</div>
                    </div>
                </div>
            </div>
        </AuthWrapper>
    )
}

export default Profile
