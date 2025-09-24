const express = require("express")
const cors = require("cors")
const fs = require("fs")
const { MongoClient } = require("mongodb")
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express()

app.use(cors())
app.use(express.json())

let products, users

async function run() {
    const client = new MongoClient("mongodb+srv://popoacageo07:g.4367eo@geo7p.cfgyttn.mongodb.net/?retryWrites=true&w=majority&appName=geo7p")
    await client.connect()

    const db = await client.db("store4U")
    products = await db.collection("products")
    users = await db.collection("users")

    app.get('/', (req, res) => {
        res.json({message: "M-am conectat"})
    })

    app.put('/logOut', async(req, res) => {
        const u = req.body
        const userToUpdate = await users.findOne({
            name: u.name,
            surname: u.surname,
            email: u.email,
            username: u.username,
            password: u.password
        })
        await users.updateOne(
            { _id: userToUpdate._id },
            { $set: { isLoggedIn: 0}}
        )

        res.json({message: "Logged Out"})
    })

    const usersRouter = require('./routes/users.js')(users)
    app.use('/users', usersRouter)

    const productsRouter = require('./routes/products.js')(products)
    app.use('/products', productsRouter)

    app.listen(3000, () => {
        console.log("M-am conectat")
    })
}

run()
