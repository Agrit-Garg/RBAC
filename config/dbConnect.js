const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        // Connect to the MongoDB database using the connection string from environment variables
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database Connected: Host - ${connect.connection.host}, Database - ${connect.connection.name}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the process with failure code if connection fails
    }
};

module.exports = dbConnect;