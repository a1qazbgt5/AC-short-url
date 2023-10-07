const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UrlSet = require('./models/url-set-model')

const baseUrl = 'localhost:3000/'
const stringLength = 5

mongoose.connect("mongodb://127.0.0.1:27017/AC")
  .then(() => console.log("Connected to mongodb."))
  .catch((e) => console.log(e));

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use((req, res, next) => {
  res.locals.originalUrl = ''
  res.locals.shortUrl = ''
  res.locals.errMsg = ''
  res.locals.showHistory = false
  res.locals.baseUrl = baseUrl
  next()
})


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', async (req, res) => {
  try {
    const { originalUrl } = req.body
    let shortUrl
    const foundUrl = await UrlSet.findOne({ originalUrl })
    if (foundUrl) {
      shortUrl = foundUrl.shortUrl
    } else {
      do { shortUrl = randomString(stringLength) }
        while (await UrlSet.findOne({ shortUrl }))
      UrlSet.create({ originalUrl, shortUrl })
    }
    res.render('index', { originalUrl, shortUrl })
  } catch (e) {
    res.status(500).send(e)
  }
})

app.get('/history', (req, res) => {
  return res.render('index', { showHistory: true })
})

app.get('/:shortUrl', async (req, res) => {
  try {
    const { shortUrl } = req.params
    const foundUrlSet = await UrlSet.findOne({ shortUrl })
    if (foundUrlSet) 
      return res.status(301).redirect('https://' + foundUrlSet.originalUrl)
    res.status(404).render('index', {errMsg : 'Page not found. Please comfirm again or generate a new short-URL.'})
  } catch (e) {
    res.status(400).send(e)
  }
})

function randomString(n) {
  if (n === 0) return ''
  let ascii = Math.floor(Math.random() * 62) + 48
  ascii = (ascii > 83) ? (ascii + 13)
    : (ascii > 57) ? (ascii + 7)
    : ascii
  return String.fromCharCode(ascii) + randomString(n - 1)
}

app.listen(3000, () => {
  console.log('Listening on port 3000')
})