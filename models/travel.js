// import the connected mongoose object
const mongoose = require("./connection")
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)


// make travel schema
const travelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    thingsToDo: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

travelSchema.pre('validate', function(next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true })
    }
  
    if (this.thingsToDo) {
      this.sanitizedHtml = dompurify.sanitize(marked(this.thingsToDo))
    }
    next()
})

// export the model
module.exports = mongoose.model('Travel', travelSchema)