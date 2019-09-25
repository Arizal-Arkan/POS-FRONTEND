import Axios from "axios";

const url = 'https://pos-arkan.herokuapp.com';

export const getAllHistory = () => {
    return {
        type: 'GET_HISTORY',
        payload: Axios.get(`${url}/history/`)
    }
}
export const postHistory = (data) => {
    return {
        type: 'ADD_HISTORY',
        payload: Axios.post(`${url}/history/`, data[0])
    }
}