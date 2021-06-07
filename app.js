const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

//Allowed Domains to access the API
const allowedOrigins = ['http://localhost:5000','http://127.0.0.1:5500'];

var corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    methods: "GET, POST, DELETE, PUT"
}
const PORT = process.env.PORT || 5000;

//To handle POST/GET/DELETE/PUT
app.all('/v1/*',cors(corsOptions),(req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      
    if(req.originalUrl == '/v1/info/get_display_currencies'){
    axios.post('https://api.coinmode-staging.com/v1/info/get_countries')
    .then((response) => {
        res.send(response.data.countries);
      }, (error) => {
        res.send(error);
      });
    }
    else{
    axios.post('https://api.coinmode-staging.com'+req.originalUrl)
    .then((response) => {
        res.send(response.data.results);
      }, (error) => {
        res.send(error);
      });
    }
}
else{
    res.status(400).send('Error in retrieving page');
}
})

app.listen(PORT,() => console.log('Server started'));
