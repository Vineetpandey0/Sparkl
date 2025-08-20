import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })
        connection.on('error', (err) => {
            console.log('Error while connecting MongoDB....' + err)
            process.exit()
        })

    } catch (error) {
        console.log('Something went wrong while connecting with mongodb....' )
        console.log(error)
    }
}