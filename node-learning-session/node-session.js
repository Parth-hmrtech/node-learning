const express = require('express');
const session = require('express-session');
const app = express();
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 30
    }
}));
app.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`welcome back ! you visited ${req.session.views} times`)
    }
    else {
        req.session.views = 1;
        res.send('welcome this is yout first visit');

    }
});
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('could not logout')
        }
        res.send('logged out successfully')
    });
});
app.listen(3003, () => {
    console.log('server running on http://localhost:3003');
});