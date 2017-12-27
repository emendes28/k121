const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Participant = require('../models/Participant.js');
const api_key = 'key-2aa1b759638496b6a1f56b9257d76940';
const domain = 'sandboxd3df4a81cf18480bbc9c40b86cea7076.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
let friend = "";
const ParticipantClass = class  { 
  constructor(n,e,f) {
    this.friend = f;
    this.name = n;
    this.email = e;
  }
}
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
    from: 'Chief of Secret <postmaster@sandboxd3df4a81cf18480bbc9c40b86cea7076.mailgun.org>',
    to: to,
    subject: 'Secret Friend',
    text: htmlEmail(who)
  }
}; 


const sortParticipants = (all,name) => {
  all.forEach(p=> {
    let friend = p.name;
    if(friend != name){
      console.log(`name atual ${name} amigo ${p.name}`);
      this.friend =  friend;
      return;
    }
  })
}
/* Raffle between participants. */
router.get('/', (req, res, next) => {
  const participantsWithFriend = [];
  Participant.find( (err, participants) => {
    if (err) return next(err);
    console.log(participants);
  participants.forEach(p => {            
      sortParticipants(participants,p.name);      
      participantsWithFriend.push(new ParticipantClass(p.name,p.email,this.friend));
      Participant.findByIdAndUpdate(p.id, p);
      mailgun.messages().send(mail(p.to,this.friend));
    });
    
    console.log(participantsWithFriend);
    res.json(participantsWithFriend);
  });
});


module.exports = router;