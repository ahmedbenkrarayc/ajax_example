const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

// Middleware to parse JSON requests
app.use(express.json());

// Helper function to read data from the JSON file
const readData = () => {
  const data = fs.readFileSync('people.json', 'utf-8');
  return JSON.parse(data);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync('people.json', JSON.stringify(data, null, 2));
};

// 1. GET /api/people - Retrieve all people
app.get('/api/people', (req, res) => {
  const data = readData();
  res.json(data);
});

// 2. POST /api/people - Add a new person
app.post('/api/people', (req, res) => {
  const { name, age } = req.body;

  // Create a new person object
  const newPerson = {
    id: Date.now(),
    name,
    age
  };

  // Read, update, and save the data
  const data = readData();
  data.push(newPerson);
  writeData(data);

  res.status(201).json(newPerson);
});

// 3. GET /api/people/:id - Retrieve a person by ID
app.get('/api/people/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const person = data.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
});

// 4. PUT /api/people/:id - Update a person by ID
app.put('/api/people/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;
  const data = readData();
  const personIndex = data.findIndex((p) => p.id === id);

  if (personIndex !== -1) {
    // Update person data
    data[personIndex] = { id, name, age };
    writeData(data);
    res.json(data[personIndex]);
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
});

// 5. DELETE /api/people/:id - Delete a person by ID
app.delete('/api/people/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const newData = data.filter((p) => p.id !== id);

  if (newData.length !== data.length) {
    writeData(newData);
    res.json({ message: 'Person deleted successfully' });
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
