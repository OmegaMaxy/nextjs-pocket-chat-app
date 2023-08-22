import {
    Box,
    Heading,
    Button,
    HStack
} from "@chakra-ui/react";
import NextLink from 'next/link'
import Layout from '../components/layouts/main'
import { signIn, signOut, useSession } from "next-auth/react";

export default function Homepage() {
    
    const session = useSession()
    return (
        <Layout>
            <Heading mb="2rem" as="h1" size="xl">Homepage of chat app</Heading>
                {
                    session.status != 'authenticated' ?
                    <HStack gap={2}>
                        <NextLink href='#'>
                            <Button colorScheme="blue" onClick={() => signIn()}>Login</Button>
                        </NextLink>
                        <NextLink href='/auth/signup'>
                            <Button colorScheme="blue" variant="outline">Signup</Button>
                        </NextLink>
                    </HStack>
                    :
                    <NextLink href="/chat">
                        <Button colorScheme="blue">Go to chat</Button>
                    </NextLink>
                }
        </Layout>
    )
}