const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Participant = require('../models/Participant.js');
const api_key = 'key-2aa1b759638496b6a1f56b9257d76940';
const domain = 'simple-secret-friend.herokuapp.com';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const htmlEmail = (who) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            background-image: url('https://simple-secret-friend.herokuapp.com/assets/background.jpg');
            background-repeat: no-repeat;
            background-origin: content-box;
            background-attachment: fixed;
            background-position: center; 
            background-size: auto;
        }
        h1{
            color: whitesmoke;
            padding-top: 30%;
            padding-left: 31%;
        } 
        h2{
            color: whitesmoke;
            padding-top: 1%;
            padding-left: 45%;
        }
    </style>
</head>
<body>
    <div>
    <h1>Seu amigo secreto é</h1>
    <h2>${who}</h2>
    </div>

</body>
</html>`;
const mail =  (to,who) => { 
  return {
    from: 'Chief of Secret <evandro.s.i.mendes@hotmail.com>',
    to: to,
    subject: 'Secret Friend',
    text: htmlEmail(who)
  }
}; 


const sortParticipants = (all,name) => {
  all.forEach(p=> {
    if(p.name != name){
      return p.name;
    }
  })
}
/* Raffle between participants. */
router.post('/', (req, res, next) => {
  const participants = req.body;
    participants.forEach(p => {            
      p.friend = sortParticipants(participants,p.name);
      Participant.findByIdAndUpdate(p.id, p, (err, p) => {
        if (err) return next(err);
      })
    })
});


module.exports = router;