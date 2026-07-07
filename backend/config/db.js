const mongoose = require('mongoose');

// Connect to Database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        try {
            await conn.connection.db.collection('users').dropIndex('userName_1');
            console.log('Dropped legacy userName index');
        } catch (indexError) {
            if (indexError.code !== 27) {
                console.error('Legacy index cleanup warning:', indexError.message);
            }
        }

        try {
            await conn.connection.db.collection('users').dropIndex('username_1');
            console.log('Dropped legacy username index');
        } catch (indexError) {
            if (indexError.code !== 27) {
                console.error('Legacy index cleanup warning:', indexError.message);
            }
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }    
};

module.exports = { connectDB };