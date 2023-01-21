const express = require('express') 
const app=express()

require('dotenv').config()
const Person = require('./models/phone')

app.use(express.json())

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
    const id=req.params.id
    console.log(typeof(id))
    const person=Person.find(person=>person.id===id)
    console.log(person)
    if(person){
       res.json(person) 
    }
    else{
        res.status(400).end()
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const person=Person.filter(person=>person.id!==id)
    res.send('Delete request to homepage')
    return res.status(204).end()
})
app.get('/api/persons',(req,res)=>{
    Person.find({}).then(person=>{
        res.json(person)
    })
    
})

app.post('/api/persons',(req,res)=>{
    const body=req.body
    if(body.name===undefined){
        return res.status(400).json({
            error: 'content missing'
    })
    }

    const person =new Person({
        name: body.name,
        number: body.number,
    })
    person.save().then(result=>{
        res.json(result)
    })
    
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  
const PORT =process.env.PORT||3001
app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
