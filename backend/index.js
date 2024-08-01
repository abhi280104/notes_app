const express = require('express')
const app=express()
const PORT= 3000
const db=require('./models/dbConnection')
const cors=require('cors')

app.use(express.json())
app.use(cors())
app.use("/api/auth",require("./routes/Auth"))
app.use("/api/note",require('./routes/note'))


app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`);
})