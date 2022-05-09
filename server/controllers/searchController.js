const path = require("path");
const fetch = require("node-fetch");

const searchController = {};

searchController.searchTrackFromSpotify = (req, res, next) => {
  //get token
  const clientId = "25cd22c9cb434ee8b778937b518d139b";
  const clientSecret = "8ed1549c6537407ab0d792ef6fd56511";
  const {artist, track, type, limit} = req.query;
    if(!artist || !track || !type || !limit){
    return next({
      log: 'Error from searchController.searchTrackFromSpotify',
      messgae: {err: 'searchController.searchTrackFromSpotify'},
    });
  }
  const params = {
    type: type,
    market: 'us',
    limit: limit,
  }
  const qs = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
  const modifiedURL = "https://api.spotify.com/v1/search?"+ `q=track:${encodeURIComponent(track)}+artist:${encodeURIComponent(artist)}&`+ qs;
  console.log("url: " + modifiedURL);
  fetch("https://accounts.spotify.com/api/token", {//get token
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: "grant_type=client_credentials",
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data.access_token);
      return data.access_token;
    })
    .then((token) => {
      fetch(modifiedURL, {//get track
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => data.json())
      .then((data) => {
        res.locals.canFindResult = true;
        res.locals.result = data.tracks.items[0];
        // console.log(res.locals.result);
        return next();
      })
      .catch((err) =>{
        console.log(err);
      }) 
    });
};


module.exports = searchController;