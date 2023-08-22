
export type User = {
    id: string
    username: string
    name: string
    email: string
    avatar: string
    verified: boolean
    created: Date
    updated: Date
    expand: UserExpand | null
}
export type Message = {
    id: string
    text: string
    voteCount: number
    isDeleted: boolean
    expand: MessageExpand | null
    created: Date
    updated: Date
    user: string // user_id
}
export type MessageExpand = {
    user: User
}
export type UserExpand = {
    messages: Message[]
}