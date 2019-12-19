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
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1ZGY2YjE5YTY3NjQzMzFjNDExOTdjNDQiLCJpYXQiOjE1NzY0Nzk1OTc0MTMsImV4cCI6MTU3NjU2NTk5NzQxM30.6c4pgY_bV3aaxYff0q753jCLTS3g3Derb2xvCOGYFyo'
});

export const createFund = agent.request('/fund/create', 'POST');

export const escrowFund = agent.request('/fund/escrow', 'POST');

export const checkAddress = address => agent.request(`/check/contractAddress/${address}`)();

export const getUserCard = agent.request('/user/card');

export const getBalance = address => agent.request(`/user/address?currencyAddress${address}`);

export const getPaymentToken = agent.request('/payment/token');

export const payment = agent.request('/payment', 'POST');


