// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../lib/prisma";
import validator from 'validator';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'DELETE') {
            const {userId} = req.body

            if (!userId) {
                return res.status(400).json({message: "Missing userId"})
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })

            if (!user) {
                return res.status(404).json({message: "User not found"})
            }

            const startToday = new Date();
            startToday.setHours(0, 0, 0, 0);
            const endToday = new Date();
            const lastEntryToday = await prisma.waterEntry.findFirst({
                where: {
                    userId: userId,
                    consumedAt: {
                        gte: startToday.toISOString(),
                        lte: endToday.toISOString()
                    }
                },
                orderBy: {
                    consumedAt: 'desc'
                }
            })

            if (!lastEntryToday) {
                return res.status(404).json({message: "No water entry found for today"})
            }

            const waterEntry = await prisma.waterEntry.delete({
                where: {
                    id: lastEntryToday.id
                },
            })

            if(!waterEntry) {
                return res.status(404).json({message: "Water entry not found"})
            }

            return res.status(200).json(waterEntry)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}