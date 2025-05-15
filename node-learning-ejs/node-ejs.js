const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const users = [
        { name: "Parth", email: "parth@gmail.com", age: 22 },
        { name: "Rishit", email: "rishit@gmail.com", age: 24 },
        { name: "Anjali", email: "anjali@gmail.com", age: 20 },
        { name: "Kiran", email: "kiran@gmail.com", age: 28 }
    ];
    res.render('home', { users });
});

app.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
});
