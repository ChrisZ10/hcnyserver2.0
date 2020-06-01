const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const PASSWORD = 'SI2H90gF7YR8Q7M8';

const mongoUri = 
'mongodb://admin:' + PASSWORD + 
'@hcnydb-shard-00-00-mndi3.mongodb.net:27017,' + 
'hcnydb-shard-00-01-mndi3.mongodb.net:27017,' + 
'hcnydb-shard-00-02-mndi3.mongodb.net:27017' + 
'/test?ssl=true&replicaSet=hcnydb-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.set('useFindAndModify', false);

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Database Connected');
});

mongoose.connection.on('error', (err) => {
    console.error('Error Connecting to Database', err);
});

app.listen(3000, () => {
    console.log('Server Connected');
});