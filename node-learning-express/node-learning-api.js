const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('home page');
});

app.get('/login', (req, res) => {
    res.send(' login page');

});
app.listen(3002, () => {
    console.log('Server running on http://localhost:3001');
});
