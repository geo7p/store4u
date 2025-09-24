const express = require('express')
const cors = require("cors")

module.exports = (users) => {
    const router = express.Router()

    router.use(cors())

    router.get('/getAll', async(req, res) => {
        const allUsers = await users.find().toArray()
        res.json(allUsers)
    })

    router.get('/getLoggedIn', async(req, res) => {
        const logged = await users.findOne({
            isLoggedIn: 1
        })
        res.json(logged)
    })

    router.post('/add', async(req, res) => {
        const newUser = req.body
        await users.insertOne({...newUser, isLoggedIn: 1})
        console.log("Am adaugat un user nou")
        res.send({message: "User added successfully"})
    })

    router.put('/update', async (req, res) => {
        const data = req.body
        const userToUpdate = await users.findOne({
            username: data.username,
            password: data.password
        })
        await users.updateOne(
            { _id: userToUpdate._id },
            { $set: {isLoggedIn: 1} }
        )

        res.send("User updated!")
    })

    return router
}