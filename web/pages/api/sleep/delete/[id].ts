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
            const {id} = req.query;

            if(typeof id !== "string" || !id || isNaN(parseInt(id))) {
                return res.status(400).json({message: "Invalid sleep entry id"})
            }

            const sleepEntry = await prisma.sleepEntry.delete({
                where: {
                    id: parseInt(id)
                },
            })

            if(!sleepEntry) {
                return res.status(404).json({message: "Sleep entry not found"})
            }

            return res.status(200).json(sleepEntry)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}