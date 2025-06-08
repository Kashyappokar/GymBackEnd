const url = "mongodb://localhost:27017/gymRegistration"

const mongoose = require('mongoose')

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected' , () => {
    console.log("Database Connected")
})

mongoose.connection.on('error', (err) => {
    console.log("Database not connected" ,err)
})