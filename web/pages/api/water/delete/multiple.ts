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
                return res.status(400).json({message: "Invalid water entry ids"})
            }

            ids.forEach(id => {
                if(isNaN(parseInt(id))) {
                    return res.status(400).json({message: "Invalid water entry id"})
                }
            })

            const waterEntries = await prisma.waterEntry.deleteMany({
                where: {
                    id: {
                        in: ids
                    }
                }
            })

            if(!waterEntries) {
                return res.status(404).json({message: "Water entry not found"})
            }

            return res.status(200).json(waterEntries)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}