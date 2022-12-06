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
            const {ids} = req.body

            if(!ids || !Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({message: "Invalid sleep entry ids"})
            }

            ids.forEach(id => {
                if(isNaN(parseInt(id))) {
                    return res.status(400).json({message: "Invalid sleep entry id"})
                }
            })

            const sleepEntries = await prisma.sleepEntry.deleteMany({
                where: {
                    id: {
                        in: ids
                    }
                }
            })

            if(!sleepEntries) {
                return res.status(404).json({message: "Sleep entry not found"})
            }

            return res.status(200).json(sleepEntries)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}