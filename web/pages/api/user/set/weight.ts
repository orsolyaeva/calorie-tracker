// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { amount, userId } = req.body

            if (!userId || isNaN(parseInt(userId))) {
                return res.status(400).json({ message: 'Invalid user id' })
            }

            if (!amount || isNaN(parseInt(amount)) || parseInt(amount) <= 0) {
                return res.status(400).json({ message: 'Invalid weight amount' })
            }

            const user = await prisma.user.update({
                where: {
                    id: parseInt(userId),
                },
                data: {
                    currentWeight: parseInt(amount),
                },
            })

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            return res.status(201).json(user)
        }
    } catch (error: any) {
        return res.status(500).json({ name: '', error: error.message })
    }
}
