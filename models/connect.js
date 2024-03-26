const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to database successfully');
    } catch (error) {
        console.log('Connect to database failure');
    }
}

module.exports = { connect };