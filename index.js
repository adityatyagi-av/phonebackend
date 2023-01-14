const express = require('express') 
const app=express()

let persons=[
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

app.get('/',(req,res)=>{
    res.send("<h1>app.get working</h1>")
})

app.get('/info',(req,res)=>{
    const d = new Date()
    console.log(d)
    res.send(`<div>
                <p>Phonebook has info for ${persons.length} people</p>
                <p>${d}</p>
                </div>`)
})
app.get('/api/persons/:id',(req,res)=>{
    const id=Number(req.params.id)
    console.log(id)
    const person=persons.find(person=>person.id===id)
    console.log(person)
    if(person){
       res.json(person) 
    }
    else{
        res.status(400).end()
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const id=Number(req.params.id)
    const person=persons.filter(person=>person.id!==id)
    res.send('Delete request to homepage')
    return res.status(204).end()
})
app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.post('/api/persons',(req,res)=>{
    const body=req.body
    const generateId=()=>{
        return Math.floor((Math.random()*100)+person.length)
    }
    if(!body.name){
        return res.status(400).json({
            error: 'content missing'
    })
    }
    const person ={
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons =persons.concat(person)
    console.log(person)
    res.json(person)
})

const PORT =3001
app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
