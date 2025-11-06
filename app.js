const express = require('express');
const app = express();
app.get('/', (req,res)=> res.send('CI/CD Working on AWS!, this is done by Loka Nehan Reddy,22011102044,IoT-A'));
app.listen(3000, ()=> console.log("Running on port 3000"));
