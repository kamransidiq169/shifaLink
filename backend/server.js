import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminroute.js'
// Load environment variables
dotenv.config()

const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(express.json())
app.use(cors())

// Connect to db
connectDb()
connectCloudinary()
// Routes
app.get('/', (req, res) => {
  res.send('API working')
})


app.use('/api/admin',adminRouter)

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})