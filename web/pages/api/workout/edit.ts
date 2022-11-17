// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../lib/prisma";
import validator from 'validator';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'PUT') {
            const {id, name, workoutCategoryId, userId, caloriesBurned, duration} = req.body

            if(!id || isNaN(parseInt(id))) {
                return res.status(400).json({message: "Invalid workout entry id"})
            }

            if(!name || name.length < 3) {
                return res.status(400).json({message: "Invalid workout entry name"})
            }

            if(!workoutCategoryId || isNaN(parseInt(workoutCategoryId))) {
                return res.status(400).json({message: "Invalid category id"})
            }

            if(!userId || isNaN(parseInt(userId))) {
                return res.status(400).json({message: "Invalid user id"})
            }

            if(!caloriesBurned || isNaN(parseInt(caloriesBurned)) || parseInt(caloriesBurned) <= 0) {
                return res.status(400).json({message: "Invalid calories burned"})
            }

            if(!duration || isNaN(parseInt(duration)) || parseInt(duration) <= 0) {
                return res.status(400).json({message: "Invalid duration"})
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                }
            })

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }

            const workoutCategory = await prisma.workoutCategory.findUnique({
                where: {
                    id: parseInt(workoutCategoryId)
                }
            })

            if(!workoutCategory) {
                return res.status(404).json({message: "Workout category not found"})
            }

            const foodEntry = await prisma.workoutEntry.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name,
                    caloriesBurned: parseInt(caloriesBurned),
                    duration: parseInt(duration),
                    workoutCategory: {
                        connect: {
                            id: parseInt(workoutCategoryId)
                        }
                    },
                    user: {
                        connect: {
                            id: parseInt(userId)
                        }
                    }
                }
            })

            if(!foodEntry) {
                return res.status(404).json({message: "Food entry not found"})
            }

            return res.status(200).json(foodEntry)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}