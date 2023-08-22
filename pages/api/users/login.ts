import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../util/prisma";
import APIUtils from '../../../util/APIUtils'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {
        
        const body = req.body
        if (!body.email_address) return APIUtils.throwError(res)
        if (!body.password) return APIUtils.throwError(res)

        const user = await prisma.user.findFirst({
            select: {
                id: true,
                email_address: true,
                bank_accounts: true,
                cards: true,
                created_at: true,
                updated_at: true,
            },
            where: {
                email_address: body.email_address,
                password: await APIUtils.encryptPassword(body.password),
            }
        })

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: error, errorMessage: 'Something went wrong...' })
    }
}