const express = require('express')
const data = require('./data')
const bcrypt = require('bcrypt')
const app = express()
const PORT = process.env.PORT || 3000

//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//Set view engine as EJS(HTML files)
 app.set('view engine', 'ejs')

//Set our static folder(CSS)
 app.use(express.static('public'))

// Root 
app.get('/',(req,res) => {
    res.send('Welcome to our schedule website')
})
//Display all users
app.get('/users',(req,res) =>{
    //res.json(data.users)
    res.render('pages/users')
})
//Display all schedules
app.get('/schedules',(req,res) =>{
    //res.json(data.schedules)
    res.render('pages/schdules')
})
app.get('/newUser',(req,res) =>{
    //res.json(data.schedules)
    res.render('pages/newUser')
})
app.get('/newSch',(req,res) =>{
    //res.json(data.schedules)
    res.render('pages/newSch')
})

//Display single user
app.get('/users/:id',(req,res) => {
    res.send(data.users[req.params.id]) 
})

//Display Schedule for a single user
app.get('/users/:id/schedules',(req,res) => {
    let schedule = []
    for(let i = 0; i < data.schedules.length; i++){
        if(data.schedules[i].user_id == Number(req.params.id)){
            schedule.push(data.schedules[i])
        }
    else{
       res.send('User not found')
   }
    res.send(schedule)
 } 
});
//Add a new user
app.post('/users', (req,res) => {
    const {firstname, lastname, email, password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = {
        firstname,
        lastname,
        email,
        password:hash
    }
    data.users.push(newUser)
    res.json(data.users)
})

app.listen(PORT,() => {
    console.log(`Here is your app : http://localhost:${PORT}`)
})