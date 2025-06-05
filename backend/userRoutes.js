const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

let userRoutes = express.Router()
const SALT_ROUNDS = 11
require("dotenv").config({ path: "./config.env" })

//Crud Operations

//#1 - Retrieve All
userRoutes.route("/users").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("users").find({}).toArray()
    if (data.length > 0) {
        response.json(data)
    }
    else {
        throw new Error("Data was not found :(")
    }
})

//#2 - Retrieve one
userRoutes.route("/users/:id").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("users").findOne({ _id: new ObjectId(request.params.id) })
    if (Object.keys(data).length > 0) {
        response.json(data)
    }
    else {
        throw new Error("Specific data was not found :(")
    }
})

//#3 - Create one
userRoutes.route("/users").post(async (request, response) => {
    let db = database.getDb()

    const takenEmail = await db.collection("users").findOne({ email: request.body.email })

    if (takenEmail) { response.json({ message: "The email is taken" }) }
    else {
        const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)
        let mongoObject = {
            name: request.body.name,
            email: request.body.email,
            password: hash,
            dateCreated:new Date(),
            visitedPosts:null
        }
        let data = await db.collection("users").insertOne(mongoObject)
        response.json(data)
    }
})

//#4 - Update one (PATCH)
userRoutes.route("/users/:id").patch(async (request, response) => {
    let db = database.getDb()
    let updateFields = {}
    let updateQuery = {}

    // Only update provided fields
    if (request.body.name !== undefined) updateFields.name = request.body.name
    if (request.body.email !== undefined) updateFields.email = request.body.email
    if (request.body.password !== undefined) updateFields.password = request.body.password
    if (request.body.dateCreated !== undefined) updateFields.dateCreated = request.body.dateCreated

    // If visitedPosts is provided as an array to append, use $push with $each
    if (Array.isArray(request.body.visitedPosts)) {
        updateQuery.$push = { visitedPosts: { $each: request.body.visitedPosts } }
    }

    // If there are other fields to set, add $set
    if (Object.keys(updateFields).length > 0) {
        updateQuery.$set = updateFields
    }

    let data = await db.collection("users").updateOne(
        { _id: new ObjectId(request.params.id) },
        updateQuery
    )
    response.json(data)
})

//#5 - Delete one
userRoutes.route("/users/:id").delete(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("users").deleteOne({ _id: new ObjectId(request.params.id) })
    response.json(data)
})

//Login
userRoutes.route("/users/login").post(async (request, response) => {
    let db = database.getDb()

    const user = await db.collection("users").findOne({ email: request.body.email })

    if (user) {
        let confirmation = await bcrypt.compare(request.body.password, user.password)
        if (confirmation) {
            const token=jwt.sign(user,process.env.SESSION_KEY,{expiresIn:"1h"})
            response.json({ success: true, token})
        }
        else {
            response.json({ success: false, message: "Incorrect Password" })
        }
    }
    else {
        response.json({ success: false, message: "User not found" })
    }
})

/*function verifyToken(request, response, next) {
    const authHeaders = request.headers["authorization"]
    const token = authHeaders && authHeaders.split(' ')[1]
    if (!token) {
        return response.status(401).json({ message: "Authentication token is missing" })
    }

    jwt.verify(token, process.env.SECRETKEY, (error, user) => {
        if (error) {
            return response.status(403).json({ message: "Invalid token" })
        }
        request.body.user = user
        next()
    })

}*/
module.exports = userRoutes