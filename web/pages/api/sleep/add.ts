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
            const {userId, duration} = req.body

            if(!userId || isNaN(parseInt(userId))) {
                return res.status(400).json({message: "Invalid user id"})
            }

            if(!duration || isNaN(parseInt(duration)) || parseInt(duration) <= 0) {
                return res.status(400).json({message: "Invalid sleep duration"})
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                }
            })

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }

            const sleepEntry = await prisma.sleepEntry.create({
                data: {
                    user: {
                        connect: {
                            id: parseInt(userId)
                        }
                    },
                    duration: parseInt(duration),
                }
            })

            if(!sleepEntry) {
                return res.status(400).json({message: "Invalid sleep entry"})
            }

            return res.status(201).json(sleepEntry)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}