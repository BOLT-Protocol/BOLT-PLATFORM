import axios from 'axios';
import { serverUrl } from '../constants/config';//

import agent from "./wrapRequest";

// TODO refactor axios to wrapRequest
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

// TODO for test
agent.setHeaders({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1ZGYwOTA2ODYzOGYwNTZmNzJiNzUxZGMiLCJpYXQiOjE1NzYwNDY2OTc4MjcsImV4cCI6MTU3NjEzMzA5NzgyN30.Jo9pC7MYZpq94ciZUs2erOD3uiNXmvnmDvdPF6GUweU'
});

export const createFund = agent.request('/fund/create', 'POST');

export const escrowFund = agent.request('/fund/escrow', 'POST');

export const checkAddress = address => agent.request(`/check/contractAddress/${address}`)();

export const getUserCard = agent.request('/user/card');