////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Travel = require("./../models/travel")
const router = express.Router()

////////////////////////////////////////
// Routes
////////////////////////////////////////////
   
// New Route (GET => /travels/new)
router.get("/new", (req, res) => {
    res.render("travels/new", { travel: new Travel () })
})

// The Edit Route (GET => /travels/:id/edit)
router.get("/edit/:id", async (req, res) => {
    const travel = await Travel.findById(req.params.id)
    res.render("travels/edit", { travel: travel })
    })

router.get('/:slug', async (req, res) => {
    const travel = await Travel.findOne({ slug: req.params.slug })
    if (travel == null) res.redirect('/')
    res.render('travels/show', { travel: travel })
    })


// Create Post Route (POST => /travels)
router.post("/", async (req, res, next) => {
    req.travel = new Travel()
    next()
}, saveTravelAndRedirect('new'))

// The Update Route (PUT => /travels/:id)
router.put("/:id", async (req, res, next) => {
   req.travel = await Travel.findById(req.params.id)
   next()
}, saveTravelAndRedirect('edit'))

// Delete Route
router.delete("/:id", async (req, res) => {
    await Travel.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

function saveTravelAndRedirect(path) {
    return async (req, res) => {
        let travel = req.travel
        travel.title = req.body.title
        travel.description = req.body.description 
        travel.thingsToDo = req.body.thingsToDo
        try {
            travel = await travel.save()
            res.redirect(`/travels/${travel.id}`)
        } catch (e) {
            res.render(`travels/${path}`, {travel : travel})
        }
    }
}


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router


