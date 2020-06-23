const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', ( req, res ) => {
    res.send('ola')
})

require('./controller/authController')(app)

app.listen(3000, () => {
    console.log('listened...')
})