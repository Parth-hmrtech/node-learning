const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    destination: function (req, res, cb) {

        const uploadpath = 'uploads/';
        if (!fs.existsSync(uploadpath)) {
            fs.mkdirSync(uploadpath);
        }
        cb(null, uploadpath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }

});

const upload = multer({ storage: storage });

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to upload file
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
        message: 'File uploaded successfully',
        filename: req.file.filename,
        path: req.file.path
    });
});

// GET endpoint to retrieve all uploaded files
app.get('/files', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to scan files', error: err });
        }
        res.status(200).json({ files });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});