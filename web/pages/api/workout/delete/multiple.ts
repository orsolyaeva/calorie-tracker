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
                return res.status(400).json({message: "Invalid workout entry ids"})
            }

            ids.forEach(id => {
                if(isNaN(parseInt(id))) {
                    return res.status(400).json({message: "Invalid workout entry id"})
                }
            })

            const workoutEntries = await prisma.workoutEntry.deleteMany({
                where: {
                    id: {
                        in: ids
                    }
                }
            })

            if(!workoutEntries) {
                return res.status(404).json({message: "Workout entry not found"})
            }

            return res.status(200).json(workoutEntries)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}