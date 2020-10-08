const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./models/Configuration');
require('./models/User');
require('./models/Announcement');
require('./models/Note');
require('./models/Course');
require('./models/Document');

require('./models/audio/Track');
require('./models/audio/Album');
require('./models/audio/Playlist');

const {authRoutes} = require('./routes/authRoutes');
const configRoutes = require('./routes/configRoutes');
const userRoutes = require('./routes/userRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const noteRoutes = require('./routes/noteRoutes');
const courseRoutes = require('./routes/courseRoutes');
const documentRoutes = require('./routes/documentRoutes');
// const audioRoutes = require('./routes/audioRoutes');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(authRoutes);
app.use(configRoutes);
app.use(announcementRoutes);
app.use(courseRoutes);
app.use(documentRoutes);
app.use(userRoutes);
app.use(noteRoutes);
app.use(audioRoutes);

const PASSWORD = 'SI2H90gF7YR8Q7M8';
const PORT = process.env.PORT || 3000;

const mongoUri = 
'mongodb://admin:' + PASSWORD + 
'@hcnydb-shard-00-00-mndi3.mongodb.net:27017,' + 
'hcnydb-shard-00-01-mndi3.mongodb.net:27017,' + 
'hcnydb-shard-00-02-mndi3.mongodb.net:27017' + 
'/test?ssl=true&replicaSet=hcnydb-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGODB_URL || mongoUri, {
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

app.get('/', (req, res) => {
    res.send('Server Running');
});

app.listen(PORT, () => {
    console.log('Server Connected');
});