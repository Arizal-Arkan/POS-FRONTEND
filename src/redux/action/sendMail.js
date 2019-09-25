import axios from 'axios'

const url = 'https://pos-arkan.herokuapp.com';

export const postMail = (email) => {
    return {
        type: 'POST_MAIL',
        payload: axios.post(`${url}/mail`,{email:email})
    }
}