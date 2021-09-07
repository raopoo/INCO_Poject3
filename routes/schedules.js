const express = require('express')
const { schedules } = require('../data')
const router = express.Router()
const db = require('../database')

//Display all schedules
router.get('/',(req,res) =>{
    db.any('SELECT * FROM schedules;')
     .then(schedules => {
        // console.log(schedules)
         res.render('pages/schedules',{schedules})
     })
     .catch(error => {
        console.log(error)
        res.send(error)
     })
})


//Display Schedule for a single user
router.get('/users/:id/schedules',(req,res) => {
    let oneSch = []
    for(let i = 0; i < data.schedules.length; i++){
        // console.log(i)
        if(data.schedules[i].user_id == Number(req.params.id)){
            oneSch.push(data.schedules[i])
            // console.log(oneSch)
        }
 } 
  res.render("pages/oneSch", {
                oneSch
         })
});
//Add new schedule form
// router.get('/newSch',(req,res) =>{
//     res.render('pages/newSch')
// })
//Add new Schdule
router.post('/',(req,res) => {
    db.none('INSERT INTO schedules(id, day, start_time, end_time) VALUES($1, $2, $3, $4);', [req.body.id, req.body.day, req.body.start_time, req.body.end_time])
  .then(() => {
    res.redirect('/schedules')
  })
  .catch(error => {
    console.log(error)
    res.send(error)
  })
    
})

module.exports = router