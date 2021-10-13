////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express") // import express framework
const mongoose = require('mongoose') // import mongoose 
const methodOverride = require("method-override")
const Travel = require('./models/travel')
const travelRouter = require("./controllers/travel")
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express();

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.set('view engine', 'ejs')
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: false})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

///////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get('/' , async (req, res) => {
    const travels = await Travel.find().sort({
    createdAt: 'desc' })
    res.render('travels/index', { travels: travels })
})

app.use('/travels', travelRouter)
//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Now Listening on port ${PORT}`)
});

