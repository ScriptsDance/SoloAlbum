const path = require("path");
const fetch = require("node-fetch");



const playlistController = {};

playlistController.createPlaylist = (req, res, next) => {
  console.log("in playlistController.createPlaylist");
  const clientId = "25cd22c9cb434ee8b778937b518d139b";
  const clientSecret = "8ed1549c6537407ab0d792ef6fd56511";

  const {name, description, public} = req.body;
  if(!name || !description || public === undefined){
    return next({
      log: 'Error from playlistController.createPlaylist',
      messgae: {err: 'An error occurred from playlistController.createPlaylist'},
    })
  }
  //1st get state and code by calling auth/login
  fetch('auth/login')
  .then((data) => data.json())
  .then((data) =>{

  })


  //2nd get token by calling auth/callback

  // fetch("https://accounts.spotify.com/login/", {//get token
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     Authorization:
  //       "Basic " +
  //       Buffer.from(clientId + ":" + clientSecret).toString("base64"),
  //   },
  //   body: "grant_type=client_credentials",
  // })
 
  fetch("https://accounts.spotify.com/api/token", {
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
      
      return data.access_token;
    })
    //3rd, get user id by calling https://api.spotify.com/v1/me
    .then((token) => {
      console.log("token is: ", token);
      fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((data) => data.json())
    .then((data) => {
      console.log("user obj is: ", data);
      console.log("user id is: ", data.id)
      return data.id;
    })
    //4th, create playlist by caliing playlist api based on user id
    .then((id) => {
      fetch(`https://api.spotify.com/v1/users/${id}/playlists`,{
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
        body: {name: name, description: description, public: public},
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("in create playlist createplaylist");
        console.log("res.locals.playlist,", res.locals.playlist);
        res.locals.playlist = data;
        return next();
      })
      .catch((error) => next(error))

    })
    })


}

module.exports = playlistController;