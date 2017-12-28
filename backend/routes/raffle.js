const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Participant = require('../models/Participant.js');
const api_key = 'key-2aa1b759638496b6a1f56b9257d76940';
const domain = 'sandboxd3df4a81cf18480bbc9c40b86cea7076.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
const ParticipantClass = class  { 
  constructor(id,n,e,f) {
    this._id = id;
    this.friend = f;
    this.name = n;
    this.email = e;
  }
}
const participantsWithFriend = [];
const htmlEmail = (who) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>    
</head>
<body>

    <div>
    <h1 style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">Seu amigo secreto é</h1>
    <h2  style="font-family: Arial, sans-serif; font-size: 48px;">${who}</h2>
    </div>

</body>
</html>`;
const mail =  (to,who) => { 
  return {
    from: 'postmaster@sandboxd3df4a81cf18480bbc9c40b86cea7076.mailgun.org',
    to: to,
    subject: 'Secret Friend',
    html: htmlEmail(who)
  }
}; 

const already = (all,name) => {
  all.forEach(p=> {
    let friend = p.friend;
    if(friend == name ){
      return false;
    }

  })
  return true;
}

const sortParticipants = (all) => {    
  for(let i = 0;i<all.length;i++){
    let p = all[i];
    let friend = (i==all.length-1)?all[0]:all[i+1];          
    console.info(`p: ${p} friend ${friend}`);
    participantsWithFriend.push(new ParticipantClass(p._id,p.name,p.email,friend.name));    
          
  }
};
/* Raffle between participants. */
router.get('/', (req, res, next) => {
  Participant.find( (err, participants) => {
    if (err) return next(err);                 
    sortParticipants(participants);
    participantsWithFriend.forEach(p => {         
      Participant.findByIdAndUpdate(p._id, p, (err, post) => {
        if (err) return next(err);       
      })
      mailgun.messages().send(mail(p.email,p.friend));
    });        
    res.json(participantsWithFriend);
  });
});


module.exports = router;