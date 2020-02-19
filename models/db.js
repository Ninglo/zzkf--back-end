const MongoClient = require('mongoDB').MongoClient;
const uri = "mongodb+srv://Ninglo:MongoDB7609mzd@cluster0-qtpew.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect(err => {
    console.log('Connect Database!')
    // perform actions on the collection object
});

module.exports = client