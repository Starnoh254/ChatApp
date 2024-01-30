const express =  require('express')
const { client , connectMongoDB } = require('./db')
const bodyParser = require("body-parser")

const app =  express()

// connect to MongoDB
connectMongoDB()
app.use(bodyParser.json()) // for parsing application/json

app.post('/sendMessage' , async (req , res) => {
    // get the data from request body
    const userData = req.body
    try {
        await client.db('chatApp').collection('users').insertOne(userData)
        console.log(`New message added : ${JSON.stringify(userData)}`)
        res.status(201).send({message: 'Message sent !'})
    }
    catch(err){
        console.log(`Error : ${err}`)
        return res.status(400).send({"error": "Something went wrong!"
    })
    }
})

app.get('/getMessages' , async (req , res) => {

    const name =  req.query.name ? req.query.name : ''
    try {
        const messages =   await client.db('chatApp').collection('users').find({user : name}).toArray()
        console.log(messages[0].message)
        res.status(200).json(messages)
    }
    catch(e){
        console.log(`Error in getting messages : ${e}`)
        res.status(500).send({"error":"Internal Server Error"})
    }
    
})

app.delete('/deleteMessage' , async (req , res) => {
    const name = req.query.name ? req.query.name : ''
    try {
        await client.db('chatApp').collection('users').deleteOne({user : name})
        res.status(200).send({"success":"Deleted Successfully"})
    }
    catch(e){
        console.log(`Error in deleting a message : ${e}`)
        res.status(500).send({"message" : "Internal server error"})
    }
})

app.put('/updateMessage' , async (req , res) => {
    const name = req.body.name
    const message = req.body.message
    try {
        await client.db('chatApp').collection('users').updateOne({user : name} , { $set: {"message" : message}})
        res.status(200).send({'message' : "Message updated successfully"})
    }
    catch(e){
        console.log("Error in updating the message")
        res.status(500).send({'message':"Internal server error"})
    }
})

app.listen(8080 , () => {
    console.log("Server started at port  8080");
})