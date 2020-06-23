const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authConfig = require('../config/auth.json')
const router = express.Router()


function generateToken(params = {}){
    return jwt.sign({ params }, authConfig.secret, { expiresIn: 86400 })
}

router.post('/cadastro', async (req, res) => {
    try {
        const user = await User.create(req.body)

        user.password = undefined;

        return res.send({ 
            user, 
            token: generateToken({ id: user.id })
         })
    }
    catch(err){
        res.status(400).send({ erro: 'oops voce não esta cadastrado'})
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password')

    if(!user) {
        return res.status(400).send({erro: 'usuario não encontrao'})
    }

    if(!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({erro: 'senha invalida'})
    }

    user.password = undefined;

    res.send({
        user, 
        token: generateToken({id: user.id})
    })
})

module.exports = app => app.use('/auth', router)