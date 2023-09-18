import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!); // ! will always resolve
        const connection = mongoose.connection;

        // connect listener
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        // error listener
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.' + err);
            process.exit();
        })
    } catch (err) {
        console.error(err);
    }
}