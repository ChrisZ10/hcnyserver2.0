const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/Configuration');
require('./models/User');
require('./models/Announcement');
require('./models/Note');

const {authRoutes} = require('./routes/authRoutes');
const configRoutes = require('./routes/configRoutes');
const userRoutes = require('./routes/userRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(configRoutes);
app.use(userRoutes);
app.use(announcementRoutes);
app.use(noteRoutes);

const PASSWORD = 'SI2H90gF7YR8Q7M8';
const PORT = 3000;

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
    useUnifiedTopology: true,
    dbName: 'hcnydb'
});

mongoose.connection.on('connected', () => {
    console.log('Database Connected');
});

mongoose.connection.on('error', (err) => {
    console.error('Error Connecting to Database', err);
});

app.listen(PORT, () => {
    console.log('Server Connected');
});