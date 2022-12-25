// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import validator from 'validator'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { startTime, endTime } = req.body

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

            const waterEntries = await prisma.waterEntry.findMany({
                where: {
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