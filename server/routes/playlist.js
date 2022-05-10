const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');


router.post('/', playlistController.createPlaylist, (req, res) => {
  return res.status(200).json({});
})



module.exports = router;