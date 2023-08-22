import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            avatar: string,
            created: Date,
            updated: Date,
            email: string,
            id: string,
            name: string,
            username: string,
            verified: boolean,
        },
        token: string
    }
}