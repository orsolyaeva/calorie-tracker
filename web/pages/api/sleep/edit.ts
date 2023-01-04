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
            const {id, userId, duration, completedAt} = req.body

            if(!id || isNaN(parseInt(id))) {
                return res.status(400).json({message: "Invalid sleep entry id"})
            }

            if(!userId || isNaN(parseInt(userId))) {
                return res.status(400).json({message: "Invalid user id"})
            }

            if(!duration || isNaN(parseFloat(duration)) || parseFloat(duration) <= 0) {
                return res.status(400).json({message: "Invalid sleep duration"})
            }

            if(!completedAt || !validator.isISO8601(completedAt)) {
                return res.status(400).json({message: "Invalid completed at date"})
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                }
            })

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }

            const sleepEntry = await prisma.sleepEntry.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    duration: parseFloat(duration),
                    completedAt: new Date(completedAt),
                    user: {
                        connect: {
                            id: parseInt(userId)
                        }
                    }
                }
            })

            if(!sleepEntry) {
                return res.status(400).json({message: "Sleep entry not found"})
            }

            return res.status(201).json(sleepEntry)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}