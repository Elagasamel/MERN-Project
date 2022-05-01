module.exports = function() {

    const express = require('express');
    const router = express.Router();

    const api = require('../controllers/api')();

    router.get('/request', api.getRequests);
    router.post('/request', api.saveRequest);

    
    return router;
};
