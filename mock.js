const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// error code
//
// 00000 success
// 00001 invalid input
// 00002 verification code error
// 00003 get verification code error
// 00004 DB error, please try again
// 00005 recaptcha check error
// 00006 creditCard error

// User
// 00100 user is regist
// 00101 phone/password error
// 00102 can't found user

// Currency
// 00200 currency create error, please try again
// 00201 currency name already used
// 00202 currency symbol already used
// 00203 currency burn fail
// 00204 currency not enough
// 00205 escrow currency not found

app.use(bodyParser.json());

app.post('/user/regist', (req, res) => {
    const {
        phone,
        password,
        code
    } = req.body;
    if (!phone || !password || !code) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });

    res.send({
        success: true,
        message: "success",
        data: {},
        code: '00000'
    });
});

app.post('/user/login', (req, res) => {
    const {
        phone,
        password
    } = req.body;
    if (!phone || !password) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });
    res.send({
        success: true,
        message: "success",
        data: {
            token: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...."
        },
        code: '00000'
    });
});

app.post('/user/forgetPassword', (req, res) => {
    const {
        phone
    } = req.body;
    if (!phone) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });
    res.send({
        success: true,
        message: "success",
        data: {},
        code: '00000'
    });
});

app.put('/user/resetPassword', (req, res) => {
    const {
        password,
        code
    } = req.body;
    if (!password || !code) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });
    res.send({
        success: true,
        message: "success",
        data: {},
        code: '00000'
    });
});

app.post('/fund/create', (req, res) => {
    const {
        name,
        symbol,
        totalSupply,
        website,
        info,
        logo,
        walletName,
        walletPassword,
        walletAddress
    } = req.body;
    if (!name || !symbol || !totalSupply || !website || !info || !logo || !walletName || !walletPassword || !walletAddress) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });
    res.send({
        success: true,
        message: "success",
        data: {
            orderID: "xxxxxxxxxxxxxxxxxx"
        },
        code: '00000'
    });
});

app.post('/fund/escrow', (req, res) => {
    const {
        contractAddress,
        symbol,
        totalSupply,
        website,
        info,
        logo,
        walletName,
        walletPassword,
        walletAddress,
    } = req.body;
    if (!contractAddress || !symbol || !totalSupply || !website || !info || !logo || !walletName || !walletPassword || !walletAddress) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });
    res.send({
        success: true,
        message: "success",
        data: {
            orderID: "xxxxxxxxxxxxxxxxxx"
        },
        code: '00000'
    });
});

app.post('/payment', (req, res) => {
    const {
        orderID,
        cardholderName,
        cardNumber,
        expiryMonth,
        expiryYear
    } = req.body;
    if (!orderID || !cardholderName || !cardNumber || !expiryMonth || !expiryYear) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });
    res.send({
        success: true,
        message: "success",
        data: {},
        code: '00000'
    });
});

app.get('/user/address', (req, res) => {
    res.send({
        success: true,
        message: "success",
        data: {
            address: '0x123456789',
            balance: '100000000000000'
        },
        code: '00000'
    });
});

app.get('/user/tokens', (req, res) => {
    res.send({
        success: true,
        message: "success",
        data: {
            list: [
                'XPA',
                'ETH'
            ]
        },
        code: '00000'
    });
});

app.get('/user/token/:symbol', (req, res) => {
    const {
        symbol
    } = req.params;
    if (!symbol) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });

    res.send({
        success: true,
        message: "success",
        data: {
            totalSupply: '10000000000000',
            type: '推管發行',
            escrow: 'Ethereum'
        },
        code: '00000'
    });
});

app.post('/fund/burn', (req, res) => {
    const {
        name,
        number
    } = req.body;
    if (!name || !number) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });

    res.send({
        success: true,
        message: "success",
        data: {},
        code: '00000'
    });
});

app.get('/user/card', (req, res) => {
    res.send({
        success: true,
        message: "success",
        data: {
            cardholderName: "test",
            cardNumber: "1234 5678 1234 5678",
            expiryMonth: "12",
            expiryYear: "26",
        },
        code: '00000'
    });
});

app.post('/fund/mint', (req, res) => {
    const {
        name,
        number
    } = req.body;
    if (!name || !number) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });

    res.send({
        success: true,
        message: "success",
        data: {
            orderID: "xxxxxxxxxxxxxxxxxx"
        },
        code: '00000'
    });
});

app.get('/user/orders', (req, res) => {
    res.send({
        success: true,
        message: "success",
        data: {
            orderList: [{
                time: 1572448302,
                type: '新發幣',
                orderID: 'xxxxxxxxxxxxxxxxxx',
                cost: '12800',
                payment: '信用卡 / 卡號 1234 **** **** 5678'
            },
            {
                time: 1572448302,
                type: '託管',
                orderID: 'xxxxxxxxxxxxxxxxxx',
                cost: '40000',
                payment: '信用卡 / 卡號 1234 **** **** 5678'
            },
            ]
        },
        code: '00000'
    });
});

app.get('/user/profile', (req, res) => {
    res.send({
        success: true,
        message: "success",
        data: {
            email: 'test@test.com',
            phone: '0912345678',
            language: '繁中'
        },
        code: '00000'
    });
});

app.put('/user/profile', (req, res) => {
    const {
        email,
        phone,
        language
    } = req.body;
    if (!email || !phone || !language) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });

    res.send({
        success: true,
        message: "success",
        data: {},
        code: '00000'
    });
});

app.get('/user/history', (req, res) => {
    res.send({
        success: true,
        message: "success",
        data: {
            logs: [{
                loginTime: 1572448302,
                loginIP: '127.0.0.1'
            },
            {
                loginTime: 1572448399,
                loginIP: '127.0.0.1'
            },
            ]
        },
        code: '00000'
    });
});

app.get('/verification', (req, res) => {
    res.send({
        success: true,
        message: "success",
        data: {},
        code: '00000'
    });
});

app.put('/user/resetPhone', (req, res) => {
    const {
        phone,
        code
    } = req.body;
    if (!phone || !code) res.send({
        success: false,
        message: "invalid input",
        data: {},
        code: '00001'
    });

    res.send({
        success: true,
        message: "success",
        data: {},
        code: '00000'
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));