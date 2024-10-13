const express = require('express')
const connectDB = require('./config/db')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoutes = require('./routes/userRoutes')
const newsRoutes = require('./routes/newsRoutes')

app.use('/users', userRoutes)
app.use('/news', newsRoutes)

connectDB()
.then(() => {
    app.listen(port, (err) => {
        if (err) {
            return console.log('❌ Something bad happened', err)
        }
        console.log(`🚀 Server is listening on ${port}`)
    })
})

module.exports = app
