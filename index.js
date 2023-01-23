const express = require('express') 
const app=express()
require('dotenv').config()
const Person = require('./models/phone')
const cors=require('cors')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}


app.use(express.json())
app.use(cors())
app.use(requestLogger)



app.get('/',(req,res)=>{
    res.send('<h1>app.get working</h1>')
})
app.get('/api/persons',(req,res)=>{
    Person.find({}).then(person=>{
        res.json(person)
    })
    
})
app.get('/info',(req,res)=>{
    const d = new Date()
    console.log(d)
    res.send(`<div>
                <p>Phonebook has info for ${Person.length} people</p>
                <p>${d}</p>
                </div>`)
})
app.get('/api/persons/:id',(req,res)=>{
    Person.findById(req.params.id)
        .then(person=>{
            if(person){
                res.json(person)
            }
            else{
                res.status(404).end()
            }   
        })
        .catch(error=>next(error))
})

app.delete('/api/persons/:id',(req,res)=>{
    Person.findByIdAndRemove(req.params.id)
        .then(result=>{
            res.status(204).end()
        })
        .catch(error=>next(error))
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
    person.save()
        .then(result=>{
            res.json(result)
        })
    
})

app.put('/api/person/:id',(req,res,next)=>{
    const body =req.body

    const person={
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id,person,{new:true})
        .then(updatedPerson=>{
            res.json(updatedPerson)
        })
        .catch(error=>next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)
  
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 
    else if(error.name ==='ValidationError'){
        return response.status(400).send({error:'Validation error'})
    }
    next(error)
    }
  
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT||3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
