import express from 'express'
import cors from 'cors'

import photoRoutes from './routes/photos.js'
import destinationRoutes from './routes/destinations.js'
import photoDestinationRoutes from './routes/photos_destinations.js'
import userPhotoRoutes from './routes/users_photos.js'

import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'
import authRoutes from './routes/auth.js'

const app = express()

app.use(session({
  secret: 'sq7taigbtwo2brby',
  resave: false,
  saveUninitialized: true
}))

//const CLIENT_URL = process.env.NODE_ENV === 'production' ? 'https://fredngo-cp-w103-lab9-client.up.railway.app' : 'http://localhost:3000'

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(GitHub)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get('/', (req, res) => {
  res.redirect('http://localhost:3000')
})

// authentication routes
app.use('/auth', authRoutes)

// app routes
app.use('/api/photos', photoRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/photos-destinations', photoDestinationRoutes)
app.use('/api/users-photos', userPhotoRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})