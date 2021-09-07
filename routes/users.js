const express = require('express')
const router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt')

//Display all users
router.get('/',(req,res) =>{
        db.any('SELECT * FROM users;')
     .then(users => {
         //console.log(posts)
         res.render('pages/users',{users})
     })
     .catch(error => {
        console.log(error)
        res.send(error)
     })
    
});


//Display single user
// router.get('/:id',(req,res) => {
//     //res.send(data.users[req.params.id]) 
//     res.render('pages/oneUser',{
//         user: data.users[req.params.id]
//     })
// })

// router.get('/newUser',(req,res) =>{
//     res.render('pages/newUser')
// })

//Add a new user
router.post('/', (req,res) => {
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(password, salt);
    db.none('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4);', [req.body.firstname, req.body.lastname, req.body.email, req.body.password])
  .then(() => {
    res.redirect('/users')
  })
  .catch(error => {
    console.log(error)
    res.send(error)
  })
    
})

module.exports = router