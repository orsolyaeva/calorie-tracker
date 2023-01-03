// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../lib/prisma";
import validator from 'validator';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {
            const {name, workoutCategoryId, caloriesBurned, duration, userId} = req.body

            if(!name || name.length < 3) {
                return res.status(400).json({message: "Invalid workout entry name"})
            }

            if(!workoutCategoryId || isNaN(parseInt(workoutCategoryId))) {
                return res.status(400).json({message: "Invalid workout category id"})
            }

            if(!userId || isNaN(parseInt(userId))) {
                return res.status(400).json({message: "Invalid user id"})
            }

            if(!caloriesBurned || isNaN(parseInt(caloriesBurned)) || parseInt(caloriesBurned) <= 0) {
                return res.status(400).json({message: "Invalid calories burned"})
            }

            if(!duration || isNaN(parseFloat(duration)) || parseFloat(duration) <= 0) {
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

            const workoutEntry = await prisma.workoutEntry.create({
                data: {
                    name,
                    workoutCategory: {
                        connect: {
                            id: parseInt(workoutCategoryId)
                        }
                    },
                    user: {
                        connect: {
                            id: parseInt(userId)
                        }
                    },
                    caloriesBurned: parseInt(caloriesBurned),
                    duration: parseFloat(duration)
                },
                include: {
                    workoutCategory: true,
                }
            })

            if(!workoutEntry) {
                return res.status(400).json({message: "Invalid workout entry"})
            }

            return res.status(201).json(workoutEntry)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}