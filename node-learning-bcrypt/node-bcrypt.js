const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/hash-password', async (req, res) => {
    const { password } = req.body; // Get password from the request body
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
    res.json({ hashedPassword });
});
app.post('/compare-password', async (req, res) => {
  try {
    const { password, hashedPassword } = req.body; // Get password and hashed password from the request body
    
    //  the plain password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (isMatch) {
      res.json({ message: 'Password matches' });
    } else {
      res.json({ message: 'Password does not match' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while comparing the password' });
  }
});
 

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
                                         
