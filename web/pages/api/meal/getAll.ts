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
            const meals = await prisma.meal.findMany()

            if(!meals || meals.length === 0) {
                return res.status(404).json({message: "Meals not found or empty"})
            }

            return res.status(201).json(meals)
        }
    } catch (error: any) {
        return res.status(500).json({name: "", error: error.message})
    }
}