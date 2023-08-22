import { 
    Avatar, 
    Box, 
    Center, 
    HStack, 
    Spinner, 
    Text,
    Link
} from '@chakra-ui/react'
import { pb } from '../../lib/pocketbase'
import { Message } from '../../lib/types'
import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import moment from 'moment'
import styles from './styles.module.css'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import MessageComponent from './Message'

export default function Messages() {
    
    const [messages, setMessages] = useState([] as any)
    const [isLoading, setLoading] = useState(false)
    let unsubscribe: any // to prevent memory leaks & clears previous effect
    
    function upvote() {}
    function downvote() {}

    function scrollDown() {
        setTimeout(() => {
            let elem: HTMLElement | null = document.getElementById('chat');
            elem!.scrollTop = elem!.scrollHeight;
        }, 500)
        // https://medium.com/@heatherbooker/how-to-auto-scroll-to-the-bottom-of-a-div-415e967e7a24
    }
    useEffect(() => {
        async function getData() {
            const resultList = await pb.collection('messages').getList(1, 50, {
                sort: 'created',
                expand: 'user',
            })
            setMessages(resultList.items)
        }
        async function subscribeToMessages() {
            unsubscribe = await pb.collection('messages').subscribe('*', async ({ action, record }: any) => {
                if (action === 'create') {
                    console.log(`action received. ${action}`)
                    const user = await pb.collection('users').getOne(record.user, { '$autoCancel': false })
                    record.expand = { user }
                    setMessages((messages: any) => [...messages, record])
                    scrollDown()
                }
                if (action === 'delete') {
                    console.log(`action received: ${action}`)
                    setMessages((messages: any) => messages.filter((msg: Message) => msg.id !== record.id))
                    scrollDown()
                }
                if (action === 'update') {
                    console.log(`action received: ${action}`)
                    if (record.voteCount == 3 && !record.isDeleted ) {
                        await pb.collection('messages').update(record.id, {
                            text: 'This comment has been deleted by mutual agreement.',
                            isDeleted: true
                        })
                    } else {
                        setMessages((messages: any) => messages.map((message: Message) => {
                            if (message.id == record.id) {
                                record.expand = message.expand
                                return record
                            } else {
                                return message
                            }
                        }))
                    }
                }
            })
        }
        setLoading(true)
        getData()
        subscribeToMessages()
        scrollDown()
        setLoading(false)

        return () => {
            unsubscribe?.()
        }
    }, [])

    return (
        <Box my="2rem" overflowY="scroll" maxHeight="400px" transition="0.2s" id="chat" className={styles.messageBox}>
            {
                isLoading ?
                <Center><Spinner size="xl"/></Center>
                :
                messages.map((message: Message, index: number) => (
                    <MessageComponent message={message} key={index}/>
                ))
            }
        </Box>
    )
}