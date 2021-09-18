const express = require('express')
//const { schedules } = require('../data')
const router = express.Router()
const db = require('../database')

//Display all schedules
router.get('/',(req,res) =>{
    db.any("SELECT id, username, day, TO_CHAR(start_time, 'HH12:MM AM') start_time, TO_CHAR(end_time, 'HH12:MM AM') end_time FROM schedules;")
     .then(schedules => {
       schedules.forEach((schedule) => {
        //console.log(schedules)
        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'];
        for(let i=1;i <= week.length+1; i++)
        { 
          if(i == schedule.day)
           {
               schedule.day = week[i-1];                         
          }
        }
        return schedule;
      })
         res.render('pages/schedules',{schedules})
     })
     .catch(error => {
        console.log(error)
        res.send(error)
     })
})

//New Schedule form
router.get('/new',(req,res) =>{
    res.render('pages/newSch',{
      message: req.query.message
    })
});


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

//Add new Schdule
router.post('/',(req,res) => {
    if((req.body.username === '') || (req.body.day === '') || (req.body.start_time === '') || (req.body.end_time === '')){
      res.redirect('/schedules/new?message=Please%20enter%20all%20fields.')
    } else if(req.body.end_time <= req.body.start_time){
      res.redirect(
          '/schedules/new?message=End%20time%20should%20be%20greater%20than%20start%20time.'
        );
  }
    else {
    db.none('INSERT INTO schedules(username, day, start_time, end_time) VALUES($1, $2, $3, $4);', [req.body.username, req.body.day, req.body.start_time, req.body.end_time])
  .then(() => {
      res.redirect('/schedules')
    })
  .catch(error => {
    console.log(error)
    res.send(error)
  })
 }   
})

module.exports = router