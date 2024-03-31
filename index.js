const express = require('express');

const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

// Return info about the phonebook
app.get('/info', (request, response) => {
  const date = new Date();
  response.send(
    `
      <h1>Phonebook Stats</h1>
      <p>
        <b>Entries: </b>${persons.length} people
      </p>
      <p>${date}</p>
    `
  );
});

// Return all persons
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// Return a single person
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// Delete a person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

// Generate a random id using Math.random
const generateId = () => {
  const idLength = 10;
  const id = Math.floor(Math.random() * idLength);
  return id;
};

// Add a new person
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is missing',
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Number is missing',
    });
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'Name must be unique',
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, person];

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
