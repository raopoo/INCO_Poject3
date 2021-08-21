const express = require('express')
const app = express()
const PORT = 3000

// Get request-route
app.get('/',(req,res) => {
    res.send('hello world')
})


app.listen(PORT,() => {
    console.log(`You are all doing great. The app : http://localhost:${PORT}`)
})