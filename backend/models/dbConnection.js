const mongoose = require('mongoose')
const URL = "mongodb+srv://abhijeetmavoori45:9441318157a@cluster0.gr2me8x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(URL)
    .then(() => {
        console.log("database connected");
    }).catch((err) => {
        console.log(err);
    })

module.exports=mongoose.connection;



