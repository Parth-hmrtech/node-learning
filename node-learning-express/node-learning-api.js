const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('home page');
});


app.listen(300, () => {
    console.log('Server running on http://localhost:3001');
});
