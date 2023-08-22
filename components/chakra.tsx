import {
    ChakraProvider,
    cookieStorageManager,
    localStorageManager
} from '@chakra-ui/react'
import theme from '../lib/theme'

type IChrakraProps = {
    cookies: string,
    children: any,
}

export default function Chakra({ cookies, children }: IChrakraProps) {
    const colorModeManager =
        typeof cookies === 'string'
            ? cookieStorageManager(cookies)
            : localStorageManager

    return (
        <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
            {children}
        </ChakraProvider>
    )
}

export function getServerSideProps({ req }: any) {
    return {
        props: {
            cookies: req.headers.cookie ?? ''
        }
    }
}
