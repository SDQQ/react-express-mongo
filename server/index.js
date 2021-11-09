require('dotenv').config()
const path = require('path')
const express = require('express')
const registerRoute = require('./routes/register')
const allRoute = require('./routes/all')
const mongoose = require('mongoose')
const loginRoute = require('./routes/login')
const postRoute = require('./routes/posts')
const testRoute =require('./routes/test')
const public = path.resolve(__dirname,`../client/dist`)
const app = express();


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(public))

app.use('/api',registerRoute)
app.use('/api',loginRoute)
app.use('/api',postRoute)
app.use('/api',testRoute)
app.use('*', allRoute)

async function start(){
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  app.listen(process.env.PORT, ()=>{
    console.log('Listening on port : '+ process.env.PORT)
  })
}

start()