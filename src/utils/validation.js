import { MIN_AMOUNT, MAX_AMOUNT } from '../constants/currency';

export const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = pwd => {
    // password need include number and letter
    const re = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9]).{8,32}$');

    return re.test(pwd);
};

export const vaildateEqual = (f, s) => {
    return f === s;
};

export const validatePhone = phone => {
    // const re = /^\+[1-9]{1}[0-9]{3,14}$/;
    const re = /^[0-9]{3,14}$/;
    return re.test(phone);
};

export const validateCurrencyName = name => {
    const re = new RegExp('^(?=.*[a-zA-Z0-9]).{1,30}$');

    return re.test(name);
};

export const validateCurrencySymbol = name => {
    const re = new RegExp('^(?=.*[a-zA-Z0-9]).{1,8}$');

    return re.test(name);
};

export const validateCurrencyAmount = amount => {
    let value = amount;
    if (typeof amount === 'string') {
        value = parseInt(value, 10);
    }

    return value >= MIN_AMOUNT && value <= MAX_AMOUNT;
};

export const validateAddress = address => {
    const startWith = /^0x/;

    // 如果 0x 開頭
    if (startWith.test(address)) {
        const re = /^0x[a-fA-F0-9]{40}$/;
        return re.test(address);
    } else {
        const re = /[a-fA-F0-9]{40}$/;
        return re.test(address);
    }
};