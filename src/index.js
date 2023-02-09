const express = require("express"); 
require('dotenv').config();
const routes = require('./routes/routes');

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(express.json());

app.use('/api', routes)

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});