const express = require('express');
const morgan = require('morgan');
const generateEmojid = require('./emojid');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Configure morgan to output the body of POST requests
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms -',
      'body:',
      tokens.body(req, res),
    ].join(' ');
  })
);

let persons = [
  {
    id: '😀',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '😎',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '🤩',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '😊',
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
  const id = String(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// Delete a person
app.delete('/api/persons/:id', (request, response) => {
  const id = String(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

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
    id: generateEmojid(),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, person];

  response.json(person);
});

// Update a person
app.put('/api/persons/:id', (request, response) => {
  const id = String(request.params.id);
  const body = request.body;

  const person = {
    id,
    name: body.name,
    number: body.number,
  };

  persons = persons.map((p) => (p.id === id ? { ...p, ...person } : p));

  response.json(person);
});

const PORT = process.env.PORT || 3001;
console.log('env.port: ', process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
