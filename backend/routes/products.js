const express = require('express')
const cors = require('cors')

module.exports = (products) => {
    const router = express.Router()

    router.get('/getAll', async(req, res) => {
        const { fName, fManufacturer, fPrice } = req.query
        let productsToFind = await products.find().toArray()
        if(fName !== "all") {
            productsToFind = productsToFind.filter(p => p.name === fName)
        }
        if(fManufacturer !== "all") {
            productsToFind = productsToFind.filter(p => p.manufacturer === fManufacturer)
        }
        if(fPrice !== "all") {
            productsToFind = productsToFind.filter(p => p.price == fPrice)
        }
        console.log(productsToFind)
        console.log(fName)
        console.log(fManufacturer)
        console.log(fPrice)
        res.json(productsToFind)
    })

    router.get('/get', async (req, res) => {
        const pr = await products.find().toArray()
        res.json(pr)
    })

    router.get('/get/:id', async(req, res) => {
        const id = req.params.id
        const prod = await products.find({
            _id: id
        }).toArray()
        res.json(prod)
    })

    router.put('/update/:name', async(req, res) => {
        const name = req.params.name
        const updatedProduct = await products.updateOne(
            { name: name },
            { $set: { isClicked: 1 }
        })
        res.json(updatedProduct)
    })

    return router
}