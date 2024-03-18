//MY IMPORTS
const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const ejs = require('ejs')

const app = express();


const dotenv = require('dotenv')
dotenv.config();
const connectDB = require('./config/db')
connectDB();

//Environmental Variables
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL


//Routes Import
const healthRoute = require('./routes/healthRoute')
const weatherRoute = require('./routes/weatherRoute')
const authRoute = require('./routes/authRoute')

//Global MiddleWares
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(express.static('public'))
app.use(cors())

app.set('view engine','ejs')


app.get('/',(req,res)=>{
    res.json({status : "Success",
            message: 'Everything Fine'})
})

// ROUTES
app.use('/api/v1/weather',weatherRoute)
app.use('/api/health',healthRoute)
app.use('/api/v1/auth',authRoute)


//APP LISTENING ON PORT
app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
        console.log('Error Occured')
    }
    else {
            console.log(`Server Up On ${PORT}`)
    }
})