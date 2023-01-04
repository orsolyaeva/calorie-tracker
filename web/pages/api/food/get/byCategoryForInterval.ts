// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../lib/prisma";
import validator from 'validator';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'GET') {
            const {mealId, startTime, endTime} = req.body

            if(!mealId || isNaN(parseInt(mealId))) {
                return res.status(400).json({message: "Invalid meal id"})
            }

            if(!startTime || isNaN(Date.parse(startTime)) || new Date(startTime) > new Date() || new Date(startTime) > new Date(endTime)) {
                return res.status(400).json({message: "Invalid start time"})
            }

            if(!endTime || isNaN(Date.parse(endTime)) || new Date(endTime) > new Date() || new Date(endTime) < new Date(startTime)) {
                return res.status(400).json({message: "Invalid end time"})
            }

            const meal = await prisma.meal.findUnique({
                where: {
                    id: parseInt(mealId)
                }
            })

            if(!meal) {
                return res.status(404).json({message: "Meal not found"})
            }

            const foodEntries = await prisma.foodEntry.findMany({
                where: {
                    mealId: parseInt(mealId),
                    consumedAt: {
                        gte: new Date(startTime),
                        lte: new Date(endTime)
                    }
                }
            })

            if(!foodEntries || foodEntries.length === 0) {
                return res.status(404).json({message: "Food entries not found"})
            }

            return res.status(201).json(foodEntries)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}