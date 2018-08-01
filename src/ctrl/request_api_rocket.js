var axios = require('axios');

var axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 5000
});

module.exports = axiosInstance;