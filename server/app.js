// app.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const reviewRoutes=require('./routes/reviewRoutes')
const exploreRoutes=require('./routes/exploreRoutes')
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/api', reviewRoutes); 
app.use('/api', exploreRoutes);
module.exports = app;
