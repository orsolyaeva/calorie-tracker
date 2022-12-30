import { NextPage } from 'next'
import { useFirebaseContext } from '../hooks/useFirebase'

const Profile: NextPage = () => {
    const { state } = useFirebaseContext()
    const { user } = state

    return (
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
                    <div className="text-slate-500 font-medium">{user.goalDate}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile
