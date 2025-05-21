const express = require('express');
const dbConnect = require('./server');
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  let data = await dbConnect();
  data = await data.find().toArray();
  console.table(data);
  res.send(data);
});

app.post('/', async (req, res) => {
  console.log(req.body);
  let data = await dbConnect();
  let result = await data.insertOne(req.body);
  console.table(result);
  res.send(result);
});


app.put('/:name', async (req, res) => {
  const userName = req.params.name;
  const updateData = req.body;

  let data = await dbConnect();
  let result = await data.updateOne(
    { name: userName },
    { $set: updateData }
  );

  if (result.matchedCount > 0) {
    res.send({ message: 'User updated successfully', result });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.delete('/:name', async (req, res) => {
  const userName = req.params.name;

  let data = await dbConnect();
  let result = await data.deleteMany({ name: userName });

  if (result.deletedCount > 0) {
    res.send({ message: 'User deleted successfully' });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.listen(3005, () => {
  console.log('Server is running on port 3005');
});
