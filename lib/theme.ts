import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
// https://chakra-ui.com/docs/styled-system/customize-theme#customizing-global-styles
const styles = {
    global: (props: any) => ({
        body: {
            bg: mode('#f0e7db', '#202023')(props)
        }
    })
}

const components = {
    Heading: {
        variants: {
            'section-title': {
                textDecoration: 'underline',
                fontSize: 20,
                textUnderlineOffset: 6,
                textDecorationColor: '#525252',
                textDecorationThickness: 4,
                marginTop: 3,
                marginBottom: 4
            }
        }
    },
    Link: {
        baseStyle: (props: any) => ({
            color: mode('#3d7aed', '#ff63c3')(props),
            textUnderlineOffset: 3
        }),
        variants: {
            'normal': (props: any) => ({
                color: '#fff',
                _hover: { color: mode('#3d7aed', '#ff63c3')(props) }
            })
        }
    }
}

const fonts = {
    //heading: "'M PLUS Rounded 1c'"
    heading: "'Roboto'"
}

const colors = {
    grassTeal: '#88ccca'
}

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
