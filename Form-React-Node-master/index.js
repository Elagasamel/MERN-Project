// FileName: index.js
// Import express
let express = require('express');
var cors = require('cors');
const path = require('path');

// Initialize the app
let app = express();
// Setup server port
var port = process.env.PORT || 8080;
app.use(cors());
require('dotenv').config();


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const mongoose = require('mongoose');

let connectionString = 'mongodb://' + process.env.DATABASE_USERNAME + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true
}, function(error) {
    if (error) {
        console.log('Error connecting to mongodb:', error);
        process.exit();
    }
});
app.use(express.static(path.join(__dirname, 'React-form/build')));

app.use('/api', require('./routes/api')());

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});
