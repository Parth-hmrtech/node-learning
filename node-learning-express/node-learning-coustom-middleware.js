// main file (e.g., app.js or index.js)
const express = require('express');
const app = express();
const logger = require('./middleware/logger'); // Make sure this path is correct
app.use(logger); // Apply logger middleware
app.get('/', (req, res) => {
  res.send("Hello");
});
app.listen(3002);
