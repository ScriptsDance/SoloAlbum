const express = require ('express');
const app = express();
const path = require('path');

//please put routers here:
const searchRouter = require('./routes/search.js');
const playlistRouter = require('./routes/playlist.js');
const authRounter = require('./routes/auth.js');

app.use(express.json());

app.use('/build', express.static(path.resolve(__dirname, '../build')));


//login spotify
app.use('/auth', authRounter);

//searchRouter is to search tracks info from spotify
app.use('/search', searchRouter);

//playListRouter is to create playlist and display playlist from spotify
app.use('/playlist', playlistRouter);

//root rounter is to render html
app.get('/', (req, res) =>{
  return res.status(200).sendFile(path.resolve(__dirname, '../client/src/index.html'));
});

//error handle for errors that not from middlewares
app.use((req, res) => res.sendStatus(400));

//global middleware error handle
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Expess error handler caught unknown middleware error',
    status: 400,
    messgae: {err: 'An error occurred'},
  }
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).json(errorObj.messgae);
})


app.listen(3000);