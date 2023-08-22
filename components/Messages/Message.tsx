import {
    Avatar,
    Box,
    Center,
    HStack,
    Spinner,
    Text,
    Link,
    Image
} from '@chakra-ui/react'
import { pb } from '../../lib/pocketbase'
import { Message } from '../../lib/types'
import MessageAPI from '../../lib/MessageAPI'
import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import moment from 'moment'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

export default function Messages(props: any) {

    const message: Message = props.message
    let media: any[] = []
    async function upvote() {
        await pb.collection('messages').update(message.id, {
            voteCount: message.voteCount+1
        }, { $autoCancel: true })
    }
    async function downvote() {
        await pb.collection('messages').update(message.id, {
            voteCount: message.voteCount - 1
        }, {$cancelKey: message.id})
    }

    const imageMedia = MessageAPI.getImageURLs(message.text)
    console.log(imageMedia)
    if (imageMedia?.length != 0) {
        let match
        while (match = imageMedia) {
            media.push(<Image src={match[0]}/>)
        }
    }
    const videoMedia = MessageAPI.getVideoURLs(message.text)
    if (videoMedia?.length != 0) {
        let match
        while (match = videoMedia) {
            media.push(<video src={match[0]}/>)
        }
    }

    return (
        <Box my="1.5rem">
            <HStack mb="0.5rem" color="gray" transition="0.2s" _hover={{ color: '#fff' }}>
                <Avatar size="xs" src={`https://avatars.dicebear.com/api/identicon/${message.expand?.user.username}.svg`} />
                <Link variant="normal" as={NextLink} href={`/profile/${message.expand?.user.username}`}>
                    {message.expand?.user.username}
                </Link>
                <Text>&#x2022; {moment(message.created).fromNow()}</Text>
                <Text>
                    {message.voteCount}
                </Text>
                <TriangleUpIcon color="#ff4500" onClick={upvote} cursor="pointer" />
                <TriangleDownIcon color="#7193ff" onClick={downvote} cursor="pointer" />
            </HStack>
            <Text>{message.text}</Text>
        </Box>
    )
}