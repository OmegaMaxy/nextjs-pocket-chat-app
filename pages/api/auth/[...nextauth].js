import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { pb, login, signOut } from '../../../lib/pocketbase'

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "Your secret password" }
            },
            async authorize(credentials, req) {
                const res = await login(credentials)
                //res.token
                /*console.log('LOGGED IN, HERE IS RES')
                console.log(res)*/
                //console.log(user)
                // (user) ? user.record
                return {user: pb.authStore.model, token: res.token}
            }
        })
    ],
    events: {
        async signout(message) {
            console.log('Signing out...')
            signOut()
        }
    },
    pages: {
        error: '/auth/error'
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            // Persist the OAuth access_token to the token right after signin
            //const userObj = user.user
            if (account) {
                token.accessToken = account.access_token
                token.user = {}
                token.user.id = user.user.id
                token.user.avatar = user.user.avatar
                token.user.created = user.user.created
                token.user.updated = user.user.updated
                token.user.name = user.user.name
                token.user.username = user.user.username
                token.user.email = user.user.email
                token.user.verified = user.user.verified
                token.token = user.token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            let newSession = token
            newSession.expires = session.expires
            session = newSession
            return session
        }
    },
}

export default NextAuth(authOptions)