const express = require('express');
const app = express();
app.get('/home',(req,res)=>{
    res.send("home");
    res.end();
});

app.listen(3006);