const express = require('express')


const app = express()
const port = 6000

app.use(express.json())
const router = require('./routes/router')
app.use(router)

app.listen(port,()=>{
    console.log(`SERVER IS RUNNING AT PORT ${port}`);
});