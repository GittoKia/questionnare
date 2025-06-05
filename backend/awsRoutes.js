const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const awsRoutes = express.Router()
const jwt = require('jsonwebtoken')
const multer = require('multer');
const upload = multer();
require("dotenv").config({ path: "./config.env" })
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid')

const s3Bucket = "fullblogstorage"

const s3Client = new S3Client({
    region: "us-east-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY

    }
})

//#1 - Retrieve one
awsRoutes.route("/images/:id").get(async (request, response) => {
    try {
        const id = request.params.id;
        const bucketParams = {
            Bucket: s3Bucket,
            Key: id,
        };

        const data = await s3Client.send(new GetObjectCommand(bucketParams));

        if (!data || !data.Body) {
            return response.status(404).json({ message: "Image not found" });
        }

        const contentType = data.ContentType || 'application/octet-stream';
        const srcString = await data.Body.transformToString('base64');

        const imageSource = `data:${contentType};base64,${srcString}`;

        response.json(imageSource);
    } catch (error) {
        response.status(500).json({ message: "Error retrieving image", error: error.message });
    }
});

//Create one
awsRoutes.route("/images").post(upload.single("file"),async (request, response) => {
    const file = request.file
    const uniqueKey = `${uuidv4()}-${file.originalname}` // Generate a unique key
    const bucketParams = {
        Bucket: s3Bucket,
        Key: uniqueKey,
        Body: file.buffer,
        ContentType: file.mimetype 
    }
    const data = await s3Client.send(new PutObjectCommand(bucketParams))
    response.json({ Key: uniqueKey })
})





function verifyToken(request,response,next){
    const authHeaders=request.headers["authorization"]
    
const token=authHeaders && authHeaders.split(' ')[1]

if (!token){
    return response.status(401).json({message:"Authentication token is missing"})
}

jwt.verify(token,process.env.SESSION_KEY,(error,user)=>{
    if (error){
        return response.status(403).json({message:"Invalid token"})
    }
    request.user = user
    next()
})

}
module.exports = awsRoutes