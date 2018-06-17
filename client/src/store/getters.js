export const currentMessages = state => {  
    const currentConversationId = state.conversation[0]._id; 
    return state.messages.filter(message => { 
        return message.conversationId == currentConversationId
    })
}