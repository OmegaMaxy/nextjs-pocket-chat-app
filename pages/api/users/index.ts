import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../util/prisma";
import APIUtils from '../../../util/APIUtils'


// Sign up
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {

        const body = req.body
        if (!body.email_address) return APIUtils.throwError(res)
        if (!body.password) return APIUtils.throwError(res)

        const user = await prisma.user.create({
            select: {
                id: true,
                email_address: true,
                bank_accounts: true,
                cards: true,
                password: false,
            },
            data: {
                email_address: body.email_address,
                password: await APIUtils.encryptPassword(body.password),
            }
        })

        res.status(200).json({ user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error, errorMessage: 'Something went wrong...' })
    }
}