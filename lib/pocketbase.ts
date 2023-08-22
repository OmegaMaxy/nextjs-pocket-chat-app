import { NextRequest, NextResponse } from 'next/server'
import Pocketbase from 'pocketbase'

export const pb = new Pocketbase('http://localhost:8090')

pb.authStore.onChange((auth: any) => {
    console.log('authStore changed!', auth)
    //console.log(pb.authStore.model)
})
/*export async function initPocketBase(req: NextRequest, res: NextResponse) {
    const pb = new Pocketbase('http://127.0.0.1:8090');

    // load the store data from the request cookie string
    pb.authStore.loadFromCookie(req?.headers?.cookie || '');

    // send back the default 'pb_auth' cookie to the client with the latest store state
    pb.authStore.onChange(() => {
        res?.setHeader('set-cookie', pb.authStore.exportToCookie());
    });

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pb.authStore.isValid && await pb.collection('users').authRefresh();
    } catch (_) {
        // clear the auth store on failed refresh
        pb.authStore.clear();
    }

    return pb
}*/

async function login({ username, password }: any) {
    const res = await pb.collection('users').authWithPassword(username, password)
    return res
}
async function createUser({ username, password, passwordConfirm, name }: any) {
    try {
        const data = {
            username,
            password,
            passwordConfirm,
            name
        }
        await pb.collection('users').create(data)
        await login({ username, password })
    } catch (error) {
        console.error(error)
    }
}
function signOut() {
    //pb.authStore.clear()
}

export {
    signOut,
    login,
    createUser
}