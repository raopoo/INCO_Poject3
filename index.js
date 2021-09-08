const express = require('express')
const homeRouter = require('./routes/home')
const usersRouter = require('./routes/users')
const schedulesRouter = require('./routes/schedules')

const app = express()
const PORT = process.env.PORT || 3000

//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Middleware
app.use('/',homeRouter)
app.use('/users',usersRouter)
app.use('/schedules',schedulesRouter)


//Set view engine as EJS(HTML files)
 app.set('view engine', 'ejs')

//Set our static folder(CSS)
 app.use(express.static('public'))
 



app.listen(PORT,() => {
    console.log(`Here is your app : http://localhost:${PORT}`)
})