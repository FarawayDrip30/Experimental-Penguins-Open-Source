const path = require('path');
const express = require("express")
const app = express()
const port = 3000
const open = require("open")

app.use(express.static(__dirname));

app.listen(port, () => console.log(`FarWebServer up on ${port}!`))
open("http://localhost:3000/")