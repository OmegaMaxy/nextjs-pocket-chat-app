import { 
    Heading, 
    HStack, 
    Text,
    Avatar
} from "@chakra-ui/react"
import moment from "moment"
import Layout from "../../components/layouts/main"
import { pb } from "../../lib/pocketbase"
import { Message, User } from "../../lib/types"



export default function ProfilePage(props: any) {

    const user: User = props.user
    const messages: Message[] = props.messages

    return (
        <Layout>
            <HStack>
                <Avatar 
                    size="xs" 
                    src={user.avatar ? `/pocketbase/pb_data/storage/pb_users_auth_/${user.id}/${user.avatar}` : `https://avatars.dicebear.com/api/identicon/${user.username}.svg`} />
                <Heading as="h1" size="lg">{user.username} - {user.verified ? 'verified' : null}</Heading>
            </HStack>
            <Text mt="1rem">Joined {moment(user.created).fromNow()}</Text>
            <Text mt="1rem">Has {messages.length} messages!</Text>
        </Layout>
    )
}


export async function getStaticPaths() {

    const data: any = await pb.collection('users').getFullList()
    const paths = data.map((user: any) => ({
        params: { username: user.username }
    }))
    return { paths, fallback: 'blocking' }
}
export async function getStaticProps(context: any) {
    const userData = await pb
        .collection('users')
        .getFirstListItem(`username="${context.params.username}"`)

    const messageData = await pb
        .collection('messages')
        .getFullList(undefined, { filter: `user="${userData.id}"` })


    return {
        props: {
            user: JSON.parse(JSON.stringify(userData)),
            messages: JSON.parse(JSON.stringify(messageData))
        },
        revalidate: 10,
    }
}