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
            const {id, userId, amount} = req.body

            if(!id || isNaN(parseInt(id))) {
                return res.status(400).json({message: "Invalid water entry id"})
            }

            if(!userId || isNaN(parseInt(userId))) {
                return res.status(400).json({message: "Invalid user id"})
            }

            if(!amount || isNaN(parseInt(amount)) || parseInt(amount) <= 0) {
                return res.status(400).json({message: "Invalid water amount"})
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                }
            })

            if(!user) {
                return res.status(404).json({message: "User not found"})
            }

            const waterEntry = await prisma.waterEntry.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    amount: parseInt(amount),
                    user: {
                        connect: {
                            id: parseInt(userId)
                        }
                    }
                }
            })

            if(!waterEntry) {
                return res.status(404).json({message: "Water entry not found"})
            }

            return res.status(201).json(waterEntry)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}