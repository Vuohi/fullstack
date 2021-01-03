const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action
        case 'ERROR':
            return action
        case 'EMPTY':
            return action
        default:
            return state
    }
}

export const setNotification = (message) => {
    return {
        type: 'NOTIFICATION',
        message
    }
}

export const setError = (message) => {
    return {
        type: 'ERROR',
        message
    }
}

export const removeNotification = () => {
    return {
        type: 'EMPTY'
    }
}

export default notificationReducer