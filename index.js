const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const app = express()
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', { define: { timestamps: false } })

app.listen(4001, () => console.log('Express API listening on port 4001'))

// TESTING
// app.get('/do-something', (request, response) => {
//     response.send(`I'll do something, I promise!`)
// })

// SEQUELIZE CONSTANT
const House = sequelize.define('house', {
    title: Sequelize.STRING,
    address: Sequelize.TEXT,
    size: Sequelize.INTEGER,
    price: Sequelize.INTEGER
}, {
        tableName: 'houses'
    })

// GET ALL HOUSES
// app.get('/houses', function (req, res, next) {
//     House.findAll()
//         .then(houses => {
//             res.json({ houses: houses })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: 'Something went wrong',
//                 error: err
//             })
//         })
// })

//GET ONE HOUSE
// app.get('/houses/:id', function (req, res, next) {
//     const id = req.params.id
//     House.findById(id)
//         .then( houses => {
//             res.json({ message: `Read house ${id}`, houses })
//         })

// House.sync() // this creates the houses table in your database when your app starts

//POST
// app.use(bodyParser.json())

// app.post('/houses', function (req, res) {
//     House
//         .create(req.body)
//         .then(house => res.status(201).json(house))
//         .catch(err => {
//                         res.status(500).json({
//                             message: 'Something went wrong',
//                             error: err
//         })
//     })
// })

// House.create({
//     title: 'Multi Million Estate',
//     address: 'This was build by a super-duper rich programmer',
//     size: 1235,
//     price: 98400000
// }).then(house => console.log(`The house is now created. The ID = ${house.id}`))

// PUT
app.put('/houses/:id', function (req, res) {
    const id = req.params.id
    House.findById(id)
    .then(res.json({ message: `Update house ${id}` }))
        .then(house => house.update({
            title: 'Super Duper Million Dollar Mainson'
        })
        .then(house => res.status(200).json(house))
        .then(house => console.log(`The house with ID ${house.id} is now updated`, house.values)))

})

// app.get('/houses/:id', function (req, res, next) {
//     const id = req.params.id
//     House.findById(id)
//         .then(houses => {
//             res.json({ message: `Read house ${id}`, houses })

//                 .then(house => res.status(200).json(house))
//                 .catch(err => {
//                     res.status(500).json({
//                         message: 'Something went wrong',
//                         error: err
//                     })
//                 })
//         })
// })

House.sync() // this creates the houses table in your database when your app starts