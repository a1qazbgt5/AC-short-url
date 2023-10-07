const mongoose = require('mongoose')
const { Schema } = mongoose

const urlSchema = new Schema({
  originalUrl: String,
  shortUrl: String
})

module.exports = mongoose.model("UrlSet", urlSchema)