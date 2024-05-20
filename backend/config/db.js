import mongoose from 'mongoose'

const Db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to ${conn.connection.host} successfully.`)
    } catch (error) {
        console.log(error)
    }
}

export default Db