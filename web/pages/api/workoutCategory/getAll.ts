// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "../../../lib/prisma";
import validator from 'validator';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === 'GET') {
            const workoutCategories = await prisma.workoutCategory.findMany()
            if(!workoutCategories || workoutCategories.length === 0) {
                return res.status(404).json({message: "Workout categories not found or empty"})
            }
            return res.status(201).json(workoutCategories)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}