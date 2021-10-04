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
//New user form
router.get('/new',(req,res) =>{
    res.render('pages/newUser')
})

//Display single user
router.get('/:id',(req,res) => {
    //res.send(data.users[req.params.id]) 
    db.one('SELECT * FROM users WHERE id = $1;', [req.params.id])
     .then(user =>{
      res.render('pages/oneUser',{
        user
     }) 
  })
  .catch(error =>{
    console.log(error)
  })
})


//Add a new user
router.post('/', (req,res) => {
    let {firstname, lastname, email, password} = req.body
    if((firstname === '') || (lastname === '') || (email === '') || (password === '')){
      res.redirect('/schedules/new?message=Please%20enter%20all%20fields.')
    }else{
      const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    password = hash;
    db.none('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4);', [firstname, lastname, email, password])
  .then(() => {
    res.redirect('/users')
  })
  .catch(error => {
    console.log(error)
    res.send(error)
  })
    
 }
    
})

module.exports = router