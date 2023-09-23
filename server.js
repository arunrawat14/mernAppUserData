const express = require('express')
const cors = require('cors');
const app = express()

const path = require('path')

// load config from env file 

require('dotenv').config();
const PORT = process.env.PORT || 4000


// middle ware 

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// import routes from routes folder to map the routes
const todoRoutes = require('./routes/routes')

// mounting the todo app with api routes
app.use('/api/v1', todoRoutes)

app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
})

// satrt server

app.listen(PORT, ()=> {
    console.log(`server started at port ${PORT}`)
})

// connect to database 

const dbConnect = require('./config/connectDatabase')

dbConnect();

app.get("/", (req,res)=> {
    res.send(`<h1> This is the home page  </h1>`)
})
