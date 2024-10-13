const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    const {host, port, name} = conn.connection
    console.log(`🚀 Database connected: mongodb://${host}:${port}/${name}`)
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`)
    throw error
  }
}

module.exports = connectDB
