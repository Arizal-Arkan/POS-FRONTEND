const initialState = {
    historyList: [],
    isLoading: false,
    isRejected: false,
    isFulFilled: false
}

const history = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_HISTORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'GET_HISTORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_HISTORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                historyList: action.payload.data.result
            }
           
        case 'ADD_HISTORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'ADD_HISTORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'ADD_HISTORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                historyList: action.payload.data.result
            }            
        default:
            return state
    }
}

export default history