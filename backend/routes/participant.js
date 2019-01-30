const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Participant = require('../models/Participant.js');

/* GET all participants. */
router.get('/', (req, res, next) => {
  Participant.find((err, participants) => {
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


module.exports = router;