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
