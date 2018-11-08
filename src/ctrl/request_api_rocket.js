var axios = require('axios');

var axiosInstance = axios.create({
    baseURL: 'https://sccd.rocket.chat/api/v1',
    timeout: 5000
});

module.exports = axiosInstance;
