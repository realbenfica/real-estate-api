const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, {define: { timestamps: false }})

const app = express()
// const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', { define: { timestamps: false } })

const port = 4000

app.listen(process.env.PORT || port, () => `Listening on port ${port}`)

console.log("my process env port is", process.env.PORT)

// TESTING
app.get('/do-something', (request, response) => {
    response.send(`I'll do something, I promise!`)
})

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
app.get('/houses', function (req, res, next) {
    House.findAll()
        .then(houses => {
            res.json({ houses: houses })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

// GET ONE HOUSE
app.get('/houses/:id', function (req, res, next) {
    const id = req.params.id
    House.findById(id)
        .then(houses => {
            res.json({ message: `Read house ${id}`, houses })
        })
})

House.sync() // this creates the houses table in your database when your app starts

//POST
app.use(bodyParser.json())

app.post('/houses', function (req, res) {
    House
        .create(req.body)
        .then(house => res.status(201).json(house))
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

House.create({
    title: 'Multi Million Estate',
    address: 'This was build by a super-duper rich programmer',
    size: 1235,
    price: 98400000
}).then(house => console.log(`The house is now created. The ID = ${house.id}`))

// PUT
app.put('/houses/:id', function (req, res) {
    const id = req.params.id
    House.findById(id)
        .then(house => house.update({
            title: 'Super Duper Million Dollar Mainson'
        })
            .then(house => res.status(200).json(house))
            .then(house2 => console.log(`The house with ID ${house2.id} is now updated`, house2.values)))
})

// DELETE
app.delete('/houses/:id', function (req, res) {
    const id = req.params.id
    House.findById(id)
        .then(house => house.destroy(id)
            .then(house => res.status(200).json(house))
            .then(house3 => console.log(`The house with ID ${house3.id} is now destroyed`)))
})
