const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

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
    response.json(persons);
})

//GET 127.0.0.1:3001/api/persons/3
server.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) { response.json(person) }
    response.status(404).end();
})

//DELETE 127.0.0.1:3001/api/persons/3
server.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).json({ message: 'Person deleted' });
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

//POST 127.0.0.1:3001/api/persons
server.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }
    const existingPerson = persons.find(person => person.name === body.name);
    if (existingPerson) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(person)
})

server.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})