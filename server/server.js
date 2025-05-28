const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));