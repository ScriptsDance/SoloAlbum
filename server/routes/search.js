const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');


// https://developer.spotify.com/console/get-search-item/
router.get('/', searchController.searchTrackFromSpotify, (req, res) => {
  return res.status(200).json(res.locals);
})



module.exports = router;