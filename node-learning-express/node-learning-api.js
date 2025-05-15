const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('home page');
});

app.get('/login', (req, res) => {
    res.send(' login page');

});
app.get('/about', (req, res) => {
    res.send('about page');
});
app.get('/help',(req,res)=>{
    res.send('help page')
});

app.listen(300, () => {
    console.log('Server running on http://localhost:3001');
});
