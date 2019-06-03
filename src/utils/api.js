import axios from 'axios';
import { serverUrl } from '../constants/config';

export const getVerifyCode = phone => {
    return axios.post(`${serverUrl}/api/phoneVerify`, {
        phone
    });
};

export const checkVerifyCode = ({ code, phone }) => {
    return axios.post(`${serverUrl}/api/codeVerify`, {
        phone,
        code
    });
};
