import Fonts from '../components/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import React, { useState } from 'react'
import { Router } from 'next/router'
import { SessionProvider } from 'next-auth/react'

type IWebsiteProps = {
    Component: any,
    pageProps: any,
    router: Router
}
function Website({ Component, pageProps: { session, ...pageProps}, router }: IWebsiteProps) {
    return (
        <SessionProvider session={session}>
            <Chakra cookies={pageProps.cookies}>
                <Fonts/>
                <AnimatePresence exitBeforeEnter initial={true}>
                    <Component {...pageProps} key={router.route}/>
                </AnimatePresence>
            </Chakra>
        </SessionProvider>
    )
}

export default Website
