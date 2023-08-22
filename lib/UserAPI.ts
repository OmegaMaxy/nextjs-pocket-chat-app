import { User, DataResponse, ResponseError } from './types'
import PREDEFINED_API_URL from './api_url'

export default class UserAPI {
    static API_URL = PREDEFINED_API_URL + '/users'
    

    public static async get(user_id: number): Promise<User> {
        const res = await fetch(`${UserAPI.API_URL}/${user_id}`)
        const data = await res.json()
        return data
    }

    public static async login(email_address: string, password: string): Promise<any> { // Promise<DataResponse<User>>
        const res = await fetch(`${UserAPI.API_URL}/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_address,
                password,
            }),
            method: 'POST'
        })
        const data = await res.json()
        return data
    }

    public static async getBankAccountsAvailableForOutgoingTransactions(user_id: number) {
        const res = await fetch(`${UserAPI.API_URL}/${user_id}/available-bank-accounts`)
        const data = await res.json()
        return data
    }

    public static async createAccount(email_address: string, password: string) {
        const res = await fetch(`${UserAPI.API_URL}/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_address,
                password,
            }),
            method: 'POST'
        })
        const data = await res.json()
        return data
    }

    public static async updatePassword(user_id: number, password: string) {
        const res = await fetch(`${UserAPI.API_URL}/update-password`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    user_id: user_id,
                    password: password,
                }
            )
        })
        const data = await res.json()
        return data
    }
}