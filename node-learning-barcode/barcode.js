const express = require('express');
const bwipjs = require('bwip-js'); // Barcode generation library

const app = express();
const port = 3001;

// Function to generate a random string
function generateRandomString(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Route to generate barcode
app.get('/generate-barcode', (req, res) => {
  const barcodeText = generateRandomString();  // Random barcode text

  try {
    // Generate the barcode image with a square shape
    bwipjs.toBuffer({
      bcid: 'code128',      // Barcode type: 'code128', 'code39', 'ean13', etc.
      text: barcodeText,    // Text to encode in the barcode
      scale: 3,             // Barcode scaling factor (1-5)
      height: 30,           // Set the height of the barcode
      includetext: true,    // Include the text under the barcode
      textxalign: 'center', // Align the text (left, center, right)
      width: 30,            // Set width to make the barcode square
      barcodeWidth: 1,      // Ensure the barcode itself is properly scaled
      encode: 'code128',    // Barcode encoding type
    })
    .then((pngBuffer) => {
      // Send the image as a response with the correct content-type
      res.set('Content-Type', 'image/png');
      res.send(pngBuffer);
    })
    .catch((error) => {
      res.status(500).send({ error: 'Failed to generate barcode' });
    });
  } catch (error) {
    res.status(500).send({ error: 'Error generating barcode' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
