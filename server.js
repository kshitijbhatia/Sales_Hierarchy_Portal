const express = require('express');
const cors = require('cors');

const Sales = require('./db/sales');
const User = require('./db/user');
const Logs = require('./db/logs');
const sequelize = require('./db/connect');
const app = express();

const PORT = 3000;

const corsOption = {
    origin : '*',
    credentials : true
}

// MiddleWare
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended : true}))


// Routes
const salesDataRoute = require('./routes/salesData')
const salesSearchRoute = require('./routes/salesSearch')
const ExportData = require('./routes/exportData')
const authenticationRoute = require('./routes/authentication')
const { restrictToLoggedInUserOnly } = require('./service/restrictUser')

app.use('/api', authenticationRoute);
app.use('/api/data/search', restrictToLoggedInUserOnly ,salesSearchRoute);
app.use('/api/data', restrictToLoggedInUserOnly , salesDataRoute);
app.use('/api/export', restrictToLoggedInUserOnly ,ExportData);

const startServer = async () =>{
    try{
        const connection = await sequelize.sync()
        if(connection){
            app.listen(PORT, ()=>{
                console.log("Connected to DB!!")
                console.log(`Server Listening on PORT: ${PORT}`)
            })
        }
    }catch(err){
        console.log("Error connecting to DB!!")
    }
}

startServer();