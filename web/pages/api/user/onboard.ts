// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {
            const {
                currentWeight,
                startWeight,
                goalWeight,
                gender,
                age,
                height,
                activityLevel,
                weeklyGoal,
                goalDate,
                userId
            } = req.body

            if(!userId || isNaN(parseInt(userId))) {
                return res.status(400).json({message: "Invalid user id"})
            }

            if(!currentWeight || isNaN(parseFloat(currentWeight)) || parseInt(currentWeight) <= 0) {
                return res.status(400).json({message: "Invalid current weight amount"})
            }

            if(!startWeight || isNaN(parseFloat(startWeight)) || parseInt(startWeight) <= 0) {
                return res.status(400).json({message: "Invalid start weight amount"})
            }

            if(!goalWeight || isNaN(parseFloat(goalWeight)) || parseInt(goalWeight) <= 0) {
                return res.status(400).json({message: "Invalid goal weight amount"})
            }

            if(!age || isNaN(parseInt(age)) || parseInt(age) <= 14) {
                return res.status(400).json({message: "Invalid age"})
            }

            if(!height || isNaN(parseFloat(height)) || parseInt(height) <= 0) {
                return res.status(400).json({message: "Invalid height"})
            }

            if(activityLevel === undefined || isNaN(parseInt(activityLevel)) || parseInt(activityLevel) < 0 || parseInt(activityLevel) > 4) {
                return res.status(400).json({message: "Invalid activity level"})
            }

            if(!weeklyGoal || isNaN(parseFloat(weeklyGoal)) || parseFloat(weeklyGoal) < 0.25 || parseFloat(weeklyGoal) > 1) {
                return res.status(400).json({message: "Invalid weekly goal"})
            }
            

            const user = await prisma.user.update({
                where: {
                    id: parseInt(userId)
                },
                data: {
                    currentWeight: parseFloat(currentWeight),
                    startWeight: parseFloat(startWeight),
                    goalWeight: parseFloat(goalWeight),
                    gender: Boolean(gender),
                    age: parseInt(age),
                    height: parseFloat(height),
                    activityLevel: parseInt(activityLevel),
                    weeklyGoal: parseFloat(weeklyGoal),
                    finishedOnboarding: true,
                    goalDate: new Date(goalDate)
                }
            })

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }

            return res.status(201).json(user)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}