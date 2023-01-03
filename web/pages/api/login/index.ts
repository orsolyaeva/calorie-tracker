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
            const {email, accessToken} = req.body

            if (!validator.isEmail(email)) {
                return res.status(400).json({message: "Invalid email"})
            }

            if (!accessToken || accessToken.length < 10) {
                return res.status(400).json({message: "Invalid access token"})
            }

            const user = await prisma.user.upsert({
                where: {
                    email
                },
                update: {
                    accessToken
                },
                create: {
                    email,
                    accessToken
                }
            })

            if(!user) {
                return res.status(400).json({message: "Invalid user"})
            }

            const fullUser = await prisma.user.findUnique({
                where: {
                    id: user.id
                },
            });

            return res.status(200).json(fullUser)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}

