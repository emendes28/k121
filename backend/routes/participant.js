const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Participant = require('../models/Participant.js');
const api_key = 'key-2aa1b759638496b6a1f56b9257d76940';
const domain = 'sandboxd3df4a81cf18480bbc9c40b86cea7076.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
const mail = (to,who) => { 
  return {
    from: 'Chief of Secret <evandro.s.i.mendes@hotmail.com>',
    to: to,
    subject: 'Secret Friend',
    text: `${who}`
  }
}; 

/* GET all participants. */
router.get('/', (req, res, next) => {
  Participant.find( (err, participants) => {
    if (err) return next(err);
    res.json(participants);
  });
});

/* GET SINGLE PARTICIPANT BY ID */
router.get('/:id', (req, res, next) => {
  Participant.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
});

/* SAVE PARTICIPANT */
router.post('/', (req, res, next) => {
  console.log(req.body);
  Participant.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
});

/* UPDATE PARTICIPANT */
router.put('/:id', (req, res, next) => {
  Participant.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
});

/* DELETE PARTICIPANT */
router.delete('/:id', (req, res, next) => {
  Participant.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  })
});


/* Raffle between participants. */
router.get('/raffle', (req, res, next) => {
  Participant.find( (err, participants) => {
    if (err) return next(err);    
    participants.forEach(p => {            
      p.friend = sortParticipants(participants,p.name);
      mailgun.messages().send(mail(p.mail,p.friend), function (error, body) {
        console.log(body);
      });
    })
  });
});

const sortParticipants = (all,name) => {
  all.forEach(p=> {
    if(p.name != name){
      return p.name;
    }
  })
}



module.exports = router;