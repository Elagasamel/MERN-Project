//const moment = require('moment');
const Request = require('../models/request');

module.exports = function() {

    var module = {};

        module.getRequests = function(req, res) {

            Request.find({}, ['name', 'email', 'tel', 'msg', 'createdAt'], {sort:{
                createdAt: -1 //Sort by Date Added DESC
            }}, function(error, data) {
    
                if (error) {
    
                    res.status(500);
                    res.send({
                        'status': 'fail',
                        'error': error
                    });
                    return;
                }
        
                res.json({
                    data: data
                });
    
            });
    
        };
    
    module.saveRequest = function(req, res) {

        let request = new Request(req.body);

        request.save()
            .then((result) => {
                res.json({
                    'status': 'success'
                });
            })
            .catch(error => {
                res.status(500);
                res.json({
                    'error': error
                })
            });
    };

    return module;
};