const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch')

const app = express()
projectData = {};

let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?of=json&key='
// var textapi = new MeaningCloud({
//     application_key: process.env.API_KEY
//  });

app.use(express.static('dist'))
// app.use(cors())
// app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json)

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile('../../dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

//GET route
app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData);
}

//POST trip info
app.post('/postInfo', addInfo);

function addInfo(request, response){
    console.log('hello from server');
    console.log(request.body);
    
    projectData = request.body;
    response.send('projectData');
    // console.log('Project Data is: ')
    // console.log(projectData);
}

// app.get('/test', function (req, res) {
//     console.log("asdf")
//     let textInput = req.query.text
//     fetch(baseURL + process.env.API_KEY + '&txt=' + textInput + '&lang=en')
//     // .then(res => console.log(res))
//     .then(res => res.json())
//     .then(function(data) {
//         console.log(data)
//         res.send(data)
//     })
//     .catch(function(err){
//         console.log(err)
//         res.send(err)
//     })
    
// })
