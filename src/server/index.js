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

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile('../../dist/index.html')
})

// designates what port the app will listen to for incoming requests
// app.listen(8081, function () {
//     console.log('Example app listening on port 8081!')
// })

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
    response.send('Successful');
    // console.log('Project Data is: ')
    // console.log(projectData);
}

module.exports = app;

