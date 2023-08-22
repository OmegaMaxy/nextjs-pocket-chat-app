import Messages from "../components/Messages/Messages";
import Layout from "../components/layouts/main"
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { pb } from "../lib/pocketbase";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { User } from "../lib/types";


export default function App(props: any) {

    const [messageInput, setMessageInput] = useState('')

    const { data: session, status: isLoggedin }: any = useSession()

    async function sendMessage() {
        const data = {
            text: messageInput,
            user: session.user.id
        }
        const createdMessage = await pb.collection('messages').create(data)
        setMessageInput('')
    }

    useEffect(() => {
        async function blabla() {
            if (isLoggedin === 'authenticated') {
                await pb.authStore.save(session.token, pb.authStore.model)
            }
        }
        blabla()
    }, [])

    return (
        <Layout noFooter>
            <Heading mb="1rem">Chat</Heading>
            <Messages />

            <Box>
                <Input
                    type="text"
                    placeholder="Message..."
                    value={messageInput}
                    onKeyDown={(ev: any) =>  ev.keyCode == 13 ? sendMessage() : null}
                    onChange={(ev: any) => { setMessageInput(ev.target.value) }} />
                <Button mt="1rem" colorScheme="blue" onClick={sendMessage}>Send</Button>
            </Box>
        </Layout>
    )
}