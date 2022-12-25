// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../lib/prisma";
import validator from 'validator';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'POST') {
            const {startTime, endTime, userId} = req.body

            if(!userId || isNaN(parseInt(userId))) {
                return res.status(400).json({message: "Invalid user id"})
            }

            if(!startTime || isNaN(Date.parse(startTime)) || new Date(startTime) > new Date() || new Date(startTime) > new Date(endTime)) {
                return res.status(400).json({message: "Invalid start time"})
            }

            if(!endTime || isNaN(Date.parse(endTime)) || new Date(endTime) > new Date() || new Date(endTime) < new Date(startTime)) {
                return res.status(400).json({message: "Invalid end time"})
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                }
            })

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }

            const workoutEntries = await prisma.workoutEntry.findMany({
                where: {
                    userId: parseInt(userId),
                    completedAt: {
                        gte: new Date(startTime),
                        lte: new Date(endTime)
                    }
                },
                include: {
                    workoutCategory: true
                }
            })

            if(!workoutEntries || workoutEntries.length === 0) {
                return res.status(404).json({message: "Workout entries not found"})
            }

            return res.status(201).json(workoutEntries)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}