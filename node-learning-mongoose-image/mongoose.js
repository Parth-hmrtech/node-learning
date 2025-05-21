const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.log("MongoDB connection error:", error);
});
