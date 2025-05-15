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

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
cd /home/ts/Parth 