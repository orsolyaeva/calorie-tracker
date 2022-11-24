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
            const {id, name, mealId, userId, calories} = req.body

            if(!id || isNaN(parseInt(id))) {
                return res.status(400).json({message: "Invalid food entry id"})
            }

            if(!name || name.length < 3) {
                return res.status(400).json({message: "Invalid food entry name"})
            }

            if(!mealId || isNaN(parseInt(mealId))) {
                return res.status(400).json({message: "Invalid meal id"})
            }

            if(!userId || isNaN(parseInt(userId))) {
                return res.status(400).json({message: "Invalid user id"})
            }

            if(!calories || isNaN(parseInt(calories)) || parseInt(calories) <= 0) {
                return res.status(400).json({message: "Invalid calories"})
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                }
            })

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }

            const meal = await prisma.meal.findUnique({
                where: {
                    id: parseInt(mealId)
                }
            })

            if(!meal) {
                return res.status(404).json({message: "Meal not found"})
            }

            const foodEntry = await prisma.foodEntry.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name,
                    calories: parseInt(calories),
                    meal: {
                        connect: {
                            id: parseInt(mealId)
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