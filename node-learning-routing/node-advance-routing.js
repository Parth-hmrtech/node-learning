const express = require('express');
const app = express();
const userRouter = express.Router();

    userRouter.get('/', (req, res) => {
    res.send('All users');
});

userRouter.get('/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});
    
app.use('/users', userRouter);
app.get('/products/:category/:id', (req, res) => {
    const { category, id } = req.params;
    res.send(`Category: ${category}, Product ID: ${id}`);
});
app.route('/books')
    .get((req, res) => {
        res.send('Get all books');
    })
    .post((req, res) => {
        res.send('Add a new book');
    });

app.route('/books/:id')
    .put((req, res) => {
        res.send(`Update book ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Delete book ${req.params.id}`);
    });

app.listen(3010, () => {
    console.log('Server running at http://localhost:3010');
});
aggregationaggregation