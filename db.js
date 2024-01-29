const {MongoClient} = require('mongodb')

const uri = "mongodb://localhost:27017/chatApp" 

const client = new MongoClient(uri , { useNewUrlParser: true , useUnifiedTopology : true})

// connect to the Mongodb server 

async function connectMongoDB() {
    try {
        await client.connect();
        console.log("connected to MongoDB")
    }
    catch (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
        }

}

module.exports = { client , connectMongoDB}