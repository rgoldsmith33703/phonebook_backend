const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

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

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const date = new Date
  const output = `<p>Phonebook has info for ${persons.length} people.</p>
                  <p>${date}</p>`
  res.send(output)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })
  }
  if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.random() * 100000
  }

  persons = persons.concat(person)
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})