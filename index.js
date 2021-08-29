const express = require('express')
const data = require('./data')
const app = express()
const PORT = process.env.PORT || 3000

// Root 
app.get('/',(req,res) => {
    res.send('Welcome to our schedule website')
})
//Display all users
app.get('/users',(req,res) =>{
    res.json(data.users)
})
//Display all schedules
app.get('/schedules',(req,res) =>{
    res.json(data.schedules)
})

//Display single user
app.get('/users/:id',(req,res) => {
    res.send(data.users[req.params.id]) 
})

//Display Schedule for a single user
app.get('/users/:id/schedules',(req,res) => {
    let schedule = []
    for(let i = 0;i< data.schedules.length;i++){
        if(data.schedules[i].user_id === Number(req.params.id)){
            schedule.push(data.schedules[i])
        }
    }
    // }else{
    //     res.send('User not found')
    // }
    res.send(schedule)
})


app.listen(PORT,() => {
    console.log(`Here is your app : http://localhost:${PORT}`)
})