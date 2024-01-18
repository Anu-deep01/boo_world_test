// db/db.js

const mongoose = require('mongoose');

async function connect() {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/boo';
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = { connect };
