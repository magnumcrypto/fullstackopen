require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const server = express()


// Custom token for morgan
morgan.token('body', (req) => JSON.stringify(req.body));

morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req)
    ].join(' ')
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

server.use(express.json())
//custom configuration for morgan
server.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//configure cors
server.use(cors())
server.use(express.static('dist'))


server.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
})

//127.0.0.1:3001/info
server.get('/info', (request, response) => {
    const date = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`);
})

//GET 127.0.0.1:3001/api/persons
server.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

//GET 127.0.0.1:3001/api/persons/3
server.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

/* //DELETE 127.0.0.1:3001/api/persons/3
server.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = Person.findById(id);

    response.status(204).json({ message: 'Person deleted' });
}) */

//POST 127.0.0.1:3001/api/persons
server.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'Content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

server.use(unknownEndpoint)

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})