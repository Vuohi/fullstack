const initialState = {
    content: '',
    isVisible: false
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
            
    }
    
}

export const showNotification = (content) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            content,
            isVisible: true
        }
    }
}

export const hideNotification = () => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            isVisible: false
        }
    }
}


export default notificationReducer