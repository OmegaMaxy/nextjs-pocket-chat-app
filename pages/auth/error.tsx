import { Heading, Text } from "@chakra-ui/react";
import Layout from "../../components/layouts/main";
import { useEffect } from 'react'


export default function ErrorPage(props: any) {

    const error = props.error

    return (
        <Layout>
            <Heading>Error</Heading>
            <Text>{error}</Text>
        </Layout>
    )
}

export function getServerSideProps(context: any) { // could be getStaticProps

    const error = context.query.error
    
    return {
        props: {
            error
        }
    }
}