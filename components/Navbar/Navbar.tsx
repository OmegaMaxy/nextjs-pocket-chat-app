import { Box, Button, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from 'next/link'
import { useSession } from "next-auth/react";
import { useEffect } from 'react'

export default function Navbar() {

    const router = useRouter()
    const session = useSession()
    const path = router.asPath

    function LinkItem({ children, href, hideInSession, showInSession, ...props }: any) {
        const isActive = (href == path)
        let endValue = 'inherit'

        if (hideInSession) {
            if (session.status == 'authenticated') {
                endValue = 'none'
            }
        }

        if (showInSession) {
            if (session.status == 'authenticated') {
                endValue = 'inherit'
            } else {
                endValue = 'none'
            }
        }

        return (
            <Link as={NextLink} href={href} display={endValue}>
                {showInSession && session.status === 'loading' ?
                    <Spinner/>
                    :
                    <Text color={isActive ? 'white' : 'whiteAlpha.600'} fontSize="xl">
                        {children}
                    </Text>
                }
            </Link>
        )
    }
    function LinkButton({ children, href, hideInSession, showInSession, ...props }: any) {
        const isActive = (href == path)
        let endValue = 'inherit'

        endValue = (session.status == 'authenticated' && hideInSession) ? 'none' : 'inherit'

        endValue = (session.status == 'authenticated' && showInSession) ? 'inherit' : 'none'

        return (
            <NextLink href={href}>
                <Button {...props} display={endValue}>
                    {children}
                </Button>
            </NextLink>
        )
    }

    return (
        <Flex justifyContent="space-between">
            <Flex p="2rem" gap={4}>
                <LinkItem href="/">Home</LinkItem>
                <LinkItem href="/chat">Chat</LinkItem>
            </Flex>
            <Flex p="2rem" gap={4}>
                <LinkButton href="/auth/signIn" colorScheme="blue" hideInSession>
                    Login
                </LinkButton>
                <LinkButton href="/auth/signUp" colorScheme="blue" variant="outline" hideInSession>
                    Create account
                </LinkButton>
                <LinkItem href={`/profile/${session.data?.user?.username}`} showInSession>You are logged in as {session.data?.user?.username}!</LinkItem>
                <LinkItem href="/api/auth/signout" showInSession>Logout</LinkItem>
            </Flex>
        </Flex>
    )
}