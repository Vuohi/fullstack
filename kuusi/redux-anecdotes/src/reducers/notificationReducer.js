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

let timer

export const setNotification = (content, interval) => {
    clearTimeout(timer)
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                content,
                isVisible: true
            }
        })
        timer = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: {
                    isVisible: false
                }
            })
        }, interval*1000)
    }
}


export default notificationReducer