// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../../lib/prisma";
import validator from 'validator';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'GET') {
            const {id} = req.query;

            if(typeof id !== "string" || !id || isNaN(parseInt(id))) {
                return res.status(400).json({message: "Invalid workout entry id"})
            }

            const workoutEntry = await prisma.workoutEntry.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if(!workoutEntry) {
                return res.status(404).json({message: "Workout entry not found"})
            }

            return res.status(201).json(workoutEntry)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}