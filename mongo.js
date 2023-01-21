const mongoose = require('mongoose')

if (process.argv.length<3){
    console.log('give password as argument')
    process.exit(1)
}

const password=process.argv[2]
const name=process.argv[3]
const number=process.argv[4]

const url =
  `mongodb+srv://adityatyagiav:${password}@database.fcoo0cd.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneSchema= new mongoose.Schema({
    name: String,
    number: Number,
})

const Phone = mongoose.model('Phone',phoneSchema)

const phone= new Phone({
    name: name,
    number: number,
})

// phone.save().then(result=>{
//     console.log(`added ${result.name} number ${number}`)
//     mongoose.connection.close()
// })

Phone.find({}).then(result=>{
    result.forEach(phone=>{
        console.log(`${phone.name} ${phone.number}`)
    })
    mongoose.connection.close()
})