const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Participant = require('../models/Participant.js');
const htmlEmail = require('../templates/email.html');
const api_key = process.env.API_KEY;
const domain = process.env.DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
const ParticipantClass = class {
  constructor(id, n, e, f) {
    this._id = id;
    this.friend = f;
    this.name = n;
    this.email = e;
  }
}
const participantsWithFriend = [];
const htmlEmail = (who) => ``;
const mail = (to, who) => {
  return {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: 'Secret Friend',
    html: htmlEmail(who)
  }
};

const already = (all, name) => {
  all.forEach(p => {
    let friend = p.friend;
    if (friend == name) {
      return false;
    }

  })
  return true;
}

const sortParticipants = (all) => {
  for (let i = 0; i < all.length; i++) {
    let p = all[i];
    let friend = (i == all.length - 1) ? all[0] : all[i + 1];
    console.info(`p: ${p} friend ${friend}`);
    participantsWithFriend.push(new ParticipantClass(p._id, p.name, p.email, friend.name));

  }
};
/* Raffle between participants. */
router.get('/', (req, res, next) => {
  Participant.find((err, participants) => {
    if (err) return next(err);
    sortParticipants(participants);
    participantsWithFriend.forEach(p => {
      Participant.findByIdAndUpdate(p._id, p, (err, post) => {
        if (err) return next(err);
      })
      mailgun.messages().send(mail(p.email, p.friend));
    });
    res.json(participantsWithFriend);
  });
});


module.exports = router;