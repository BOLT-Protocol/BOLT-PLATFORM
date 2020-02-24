import agent from "./wrapRequest";

// GetCountryCodes
export const getCountryCodes = agent.request('/countryCodes');

// Register
export const registerEmail = ({ email, password, code }) => agent.request('/user/register/email', 'POST')({ email, password, code });

export const registerPhone = ({ phone, password, countryCode, code }) => agent.request('/user/register/phone', 'POST')({ phone, password, countryCode, code });

// Login
// -- loginIP & clientInfo ??
export const loginEmail = ({ email, password }) => agent.request('/user/login/email', 'POST')({ email, password });

export const loginPhone = ({ phone, countryCode, password }) => agent.request('/user/login/phone', 'POST')({ phone, countryCode, password });

// ForgetPassword
export const getResetPasswordCode = ({ email }) => agent.request(`/user/resetPassword/${email}`)();

// -- API bug: 重設密碼
export const resetPassword = ({ email }) => agent.request(`/user/resetPassword/${email}`, 'PUT');

// GetVerifyCode
export const getVerifyCodeEmail = ({ email }) => agent.request(`/verification/email/${email}`)();

// -- API 路徑可能有誤
export const getVerifyCodePhone = ({ phone, countryCode }) => agent.request(`/verification/phone/${phone}?countryCode=${countryCode}`)();

// CheckRegister
export const checkRegisteredEmail = email => agent.request(`/check/email/${email}`)();

export const checkRegisteredPhone = (phone, string) => agent.request(`/check/phone/${phone}?countryCode=${string}`)();

export const destroyToken = ({ tokenSecret }) => agent.request('/destroyToken', 'POST')({ tokenSecret });

export const createFund = agent.request('/fund/create', 'POST');

export const escrowFund = agent.request('/fund/escrow', 'POST');

export const withdrawFund = agent.request('/fund/withdraw', 'POST');

export const mintFund = agent.request('/fund/mint', 'POST');

export const burnFund = agent.request('/fund/burn', 'POST');

export const checkAddress = address => agent.request(`/check/contractAddress/${address}`)();

export const getUserCard = agent.request('/user/card');

export const getBalance = address => agent.request(`/user/address?currencyAddress${address}`);

export const getPaymentToken = agent.request('/payment/token');

export const payment = agent.request('/payment', 'POST');

export const getCost = totalSupply => agent.request(`/payment/cost?totalSupply=${totalSupply}`)();

export const getCurrencyList = agent.request('/user/symbols');

export const getSymbol = symbol => agent.request(`/user/token/${symbol}`)();

export const getUserProfile = agent.request('/user/profile');

export const getUserBannerInfo = agent.request('/user/bannerInfo');

export const getUserBalance = currencyID => agent.request(`/user/address/${currencyID}`)();

export const checkCurrencyName = name => agent.request(`/check/name/${name}`)();

export const checkCurrencySymbol = symbol => agent.request(`/check/symbol/${symbol}`)();

