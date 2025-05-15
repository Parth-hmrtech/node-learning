const express = require('express');
const app = express();
app.use(express.json());

let item=[];
app.post('/login',(req,res)=>{
    const {name} = req.body;
    if(!name)
    {
        return res.status(400).json({error:'Name is required'})
    }
    item.push(name  );
    res.status(201).json({ message: 'Name added successfully', data: name });

});
app.get('/home',(req,res)=>{
    res.json(item)
    res.end();
});
app.listen(3009);