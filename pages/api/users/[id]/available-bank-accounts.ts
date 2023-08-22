import prisma from '../../../../util/prisma'
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {
        
        const availableBankAccounts = await prisma.bankAccount.findMany({
            where: {
                user_id: Number(req.query.id),
                isBlocked: false
            },
            include: {
                user: true,
            }
        }) 

        res.status(200).json({ availableBankAccounts })
    } catch (error) {
        res.status(400).json({ error: error, errorMessage: 'Something went wrong...' })
    }
}