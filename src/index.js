const express = require('express')
const coap = require('coap')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
 res.render('coapdata')
})

app.post('/example', (req, res) => {
  res.send(`Os dados do formulário são ${req.body.boardName}, ${req.body.inlineRadioOptions}, ${req.body.selectNfunction}, ${req.body.selectNpoint}`)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})