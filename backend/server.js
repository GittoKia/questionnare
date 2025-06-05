const connect = require("./connect")
const express = require("express")
const cors = require("cors")
const topics = require("./topicRoutes")
const users = require("./userRoutes")
const aws=require("./awsRoutes")
const multer=require("multer")

const upload=multer()
const app = express()
const PORT = 3000

app.use(cors())
app.use('/images', aws);
app.use(express.json())
app.use(topics)
app.use(users)


app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server is running on port ${PORT}`)
})