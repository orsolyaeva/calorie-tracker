// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { startTime, endTime, userId} = req.body

            if(!userId || isNaN(parseInt(userId))) {
                return res.status(400).json({message: "Invalid user id"})
            }

            if (
                !startTime ||
                isNaN(Date.parse(startTime)) ||
                new Date(startTime) > new Date() ||
                new Date(startTime) > new Date(endTime)
            ) {
                return res.status(400).json({ message: 'Invalid start time' })
            }

            if (
                !endTime ||
                isNaN(Date.parse(endTime)) ||
                new Date(endTime) > new Date() ||
                new Date(endTime) < new Date(startTime)
            ) {
                return res.status(400).json({ message: 'Invalid end time' })
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                }
            })

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }


            const waterEntries = await prisma.waterEntry.findMany({
                where: {
                    userId: parseInt(userId),
                    consumedAt: {
                        gte: new Date(startTime),
                        lte: new Date(endTime),
                    },
                },
            })

            if (!waterEntries || waterEntries.length === 0) {
                return res.status(404).json({ message: 'Water entries not found' })
            }

            return res.status(201).json(waterEntries)
        }
    } catch (error: any) {
        return res.status(500).json({ name: '', error: error.message })
    }
}
