import { Center, Heading, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import Layout from "../components/layouts/main"


export default function NotFoundPage(props: any) {

    const errorMessage = props.errorMessage

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <Layout>
            <Center>
                <Heading as="h1" size="xl">404 - not found</Heading>
            </Center>
            <Center>
                <Text>{errorMessage != '' ? errorMessage : 'Page or item not found.'}</Text>
            </Center>
        </Layout>
    )
}

/*
export function getServerSideProps({ req }: any) {
    // https://stackoverflow.com/questions/55182529/next-js-router-push-with-state
    return {
        props: {
            errorMessage: req.query.errorMessage
        }
    }
}*/