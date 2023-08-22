import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../util/prisma";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        let id
        if (req.query.id) {
            id = Number(req.query.id);
        } else {
            throw new Error('Bad request')
        }
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                bank_accounts: true,
                cards: true
            }
        })

        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ errorMessage: 'Something went wrong..', error: error })
    }
}