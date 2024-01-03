const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

const shortLinkController = require('./controllers/shortLinkController');

app.use(cors(corsOptions)) 
app.use(express.json());
app.use('/api/shortlinks', shortLinkController);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
