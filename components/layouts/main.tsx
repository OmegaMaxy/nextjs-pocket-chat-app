import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../Navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../Footer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

const Layout = ({ children, sessionProtected, noFooter = false }: any) => {

    const router = useRouter()
    const session = useSession()
    

    /*useEffect(() => {
        console.log('hmm...')
        if (sessionProtected) {
            if (!session.isLoggedIn) {
                console.log('Sending to login...')
                router.push(`/login`)
            }
        }
    }, [session])*/

    return (
        <Box as="main" pb={8} >
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" href="https://omegatoday.eu/app/img/ou/OmegaUnaIcon.ico" />
                <link rel="shortcut icon" href="https://omegatoday.eu/app/img/ou/OmegaUnaIcon.ico" />
                <title>Chat app</title>
            </Head>

            <NavBar />

            <Container maxW="container.lg" pt={14} >

                {children}

                {noFooter ? null : <Footer />}
            </Container>
        </Box>
    )
}

export default Layout
