import { NextApiResponse } from "next"
import bcrypt from 'bcrypt'

export default class APIUtils {

    public static throwError(res: NextApiResponse, message?: string) {
        res.status(400).json({ error: 'Error, bad request.', errorMessage: (message ? message : 'Bad request.') })
        return
        // TODO: problem: cannot send after conn closed. Does this work with return?
    }

    public static async encryptPassword(password: string): Promise<string> {
        /*return bcrypt.genSalt(10)
            .then((salt: string) => {
                return bcrypt.hash(password, salt)
            })
            .catch((err: any) => { return '' })*/
        const salt = '$2b$10$/dvcgRDHAi/xssYWqbTgC.'
        return bcrypt.hash(password, salt).catch((err: any) => { return '' })
    }

    public static async comparePassword(password: string, encryptedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, encryptedPassword)
            .catch((err) => { return false })
    }

}