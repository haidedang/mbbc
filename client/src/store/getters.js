export const currentMessages = state => {
    if (state.conversation == null) {
        return state.messages
    } else {
        console.log(state.messages)
        const currentConversationId = state.conversation[0]._id;
        console.log(currentConversationId)
        return state.messages.filter(message => {
            return message.conversationId == currentConversationId
        })
    }
}

