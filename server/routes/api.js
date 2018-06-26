const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const connectionString = `mongodb://bogdanjava:Bugabugabugaga2@ds219051.mlab.com:19051/eventsdb`
const User = require('../models/user')
const jwt = require('jsonwebtoken')

mongoose.connect(connectionString, (err) => {
    if (err) {
        console.error(`Error: ${err}`)
    } else {
        console.log("Connected to MongoDB")
    }
})

router.get('/', (req, res) => {
    res.send('From API router')
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({
        email: userData.email
    }, (err, user) => {
        if (err) {
            console.error(err)
        } else {
            if (!user) {
                res.status(401).send('invalid email')
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send("invalid password")
                } else {
                    let payload = {
                        subject: user._id
                    }
                    let token = jwt.sign(payload, 'secret')
                    res.status(200).send({
                        token
                    })
                }
            }
        }
    })
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.error(error)
        } else {
            let payload = {
                subject: registeredUser._id
            }
            let token = jwt.sign(payload, 'secret')
            res.status(200).send({
                token
            })
        }
    })
})

router.get('/events', (req, res) => {
    let events = [{
            "_id": 1,
            "name": "Auto Expo",
            "description": "Automobile show",
            "date": "2018-06-01"
        },
        {
            "_id": 2,
            "name": "Higan",
            "description": "Anime/cosplay performance",
            "date": "2017-04-02"
        },
        {
            "_id": 3,
            "name": "Unicon",
            "description": "Anime/cosplay/sci-fi/games performance",
            "date": "2016-11-24"
        },
        {
            "_id": 4,
            "name": "JLPT",
            "description": "Nihongo nouryoku shiken",
            "date": "2018-07-01"
        }
    ]
    res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
    let events = [{
            "_id": 1,
            "name": "Auto Expo",
            "description": "Automobile show",
            "date": "2018-06-01"
        },
        {
            "_id": 2,
            "name": "Higan",
            "description": "Anime/cosplay performance",
            "date": "2017-04-02"
        },
        {
            "_id": 3,
            "name": "Unicon",
            "description": "Anime/cosplay/sci-fi/games performance",
            "date": "2016-11-24"
        },
        {
            "_id": 4,
            "name": "JLPT",
            "description": "Nihongo nouryoku shiken",
            "date": "2018-07-01"
        }
    ]
    res.json(events)
})

module.exports = router

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload;
    try {
        payload = jwt.verify(token, 'secret')
    } catch (err) {
        console.error("Token is corrupted")
        return res.status(403).send('Token is corrupted')
    }
    if (!payload) {
        return res.status(401).send('Parsing error')
    }
    req.userId = payload.subject
    next()
}