const express = require('express');
const router  = express.Router();

router.get('/new_part1', (req, res) => {
  res.render('maps_new')
})

router.get('/new_part2', (req, res) => {
  
})

module.exports = router;