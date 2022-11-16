// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../lib/prisma";
import validator from 'validator';
import {type} from "os";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'GET') {
            const {email} = req.query

            if(!email) {
                return res.status(400).json({message: "Invalid email"})
            }

            if (typeof email !== "string" || !validator.isEmail(email)) {
                return res.status(400).json({message: "Invalid email"})
            }

            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if(!user) {
                return res.status(400).json({message: "Invalid user"})
            }

            return res.status(200).json(user)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}

