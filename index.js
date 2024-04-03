require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

// Configure morgan to output the body of POST requests
morgan.token('body', (req) => JSON.stringify(req.body))
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
    ].join(' ')
  })
)

const Listing = require('./models/listing')

// Return info about the phonebook
app.get('/info', (request, response) => {
  Listing.find({}).then((listings) => {
    const date = new Date()
    response.send(
      `
          <h1>Phonebook Stats</h1>
          <p>
            <b>Entries: </b>${listings.length} people
          </p>
          <p>${date}</p>
        `
    )
  })
})

// Return all persons
app.get('/api/persons', (request, response) => {
  Listing.find({}).then((listings) => {
    response.json(listings)
  })
})

// Return a single person
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Listing.findById(id)
    .then((listing) => {
      if (listing) {
        response.json(listing)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// Delete a person
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  if (!id) {
    return response.status(400).json({
      error: 'Listing ID is missing',
    })
  }

  Listing.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// Add a new person
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  // Validate the request
  // if (!body.name) {
  //   return response.status(400).json({
  //     error: 'Name is missing',
  //   });
  // }

  // if (!body.number) {
  //   return response.status(400).json({
  //     error: 'Number is missing',
  //   });
  // }

  // Check if the name is already in the phonebook
  Listing.findOne({ name: body.name })
    .then((listing) => {
      if (listing) {
        return response.status(400).json({
          error: 'Name must be unique',
        })
      } else {
        // Create a new listing
        const newListing = new Listing({
          name: body.name,
          number: body.number,
        })
        // Save the new listing
        newListing.save().then((listing) => {
          return response.json(listing)
        })
      }
    })
    .catch((error) => next(error))
})

// Update a person
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const updatedListing = {
    name: body.name,
    number: body.number,
  }

  Listing.findByIdAndUpdate(id, updatedListing, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((listing) => {
      return response.json(listing)
    })
    .catch((error) => next(error))
})

// 404 middleware
const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// this has to be the last loaded middleware, also all the routes should be registered before this!
const errorHandler = require('./util/errorHandler')
app.use(errorHandler)

const PORT = process.env.PORT
console.log('env.port: ', process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
