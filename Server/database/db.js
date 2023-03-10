const mongoose = require('mongoose');

module.exports = () => {
    const connectionParser = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        mongoose.connect(process.env.MONGO_URL,connectionParser)
        console.log('Database Connected')
    } catch (error) {
        console.log(error);    
    }
}