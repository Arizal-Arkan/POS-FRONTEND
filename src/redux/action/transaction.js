import Axios from "axios";

const url = 'https://pos-arkan.herokuapp.com';

export const getAllTransaction = () => {
    return {
        type: 'GET_TRANSACTION',
        payload: Axios.get(`${url}/transactions/`)
    }
}

export const addTransaction = (data) => {
    return {
        type: 'ADD_TRANSACTION',
        payload: Axios.post(`${url}/transactions/`, data)
    }
}