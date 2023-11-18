import { pool } from './database.js'
import './dotenv.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const currentPath = fileURLToPath(import.meta.url)
const photosFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/data.json'))
const photosData = JSON.parse(photosFile)

const createPhotosTable = async () => {
  const createPhotosTableQuery = `
    CREATE TABLE IF NOT EXISTS photos (
      id serial PRIMARY KEY,
      title varchar(100) NOT NULL,
      description varchar(500) NOT NULL,
      img_url text NOT NULL,
      num_votes integer DEFAULT 0
    );
  `

  try {
    const res = await pool.query(createPhotosTableQuery)
    console.log('🎉 photos table created successfully')
  }
  catch (err) {
    console.error('⚠️ error creating photos table', err)
  }
}

const createDestinationsTable = async () => {
  const createDestinationsTableQuery = `
    CREATE TABLE IF NOT EXISTS destinations (
      id serial PRIMARY KEY,
      destination varchar(100) NOT NULL,
      description varchar(500) NOT NULL,
      city varchar(100) NOT NULL,
      country varchar(100) NOT NULL,
      img_url text NOT NULL,
      flag_img_url text NOT NULL
    );
  `

  try {
    const res = await pool.query(createDestinationsTableQuery)
    console.log('🎉 destinations table created successfully')
  }
  catch (err) {
    console.error('⚠️ error creating destinations table', err)
  }
}

const createPhotosDestinationsTable = async () => {
  const createPhotosDestinationsTableQuery = `
    CREATE TABLE IF NOT EXISTS photos_destinations (
      photo_id int NOT NULL,
      destination_id int NOT NULL,
      PRIMARY KEY (photo_id, destination_id),
      FOREIGN KEY (photo_id) REFERENCES photos(id) ON UPDATE CASCADE,
      FOREIGN KEY (destination_id) REFERENCES destinations(id) ON UPDATE CASCADE
    );
  `

  try {
    const res = await pool.query(createPhotosDestinationsTableQuery)
    console.log('🎉 photos_destinations table created successfully')
  }
  catch (err) {
    console.error('⚠️ error creating photos_destinations table', err)
  }
}

const createUsersTable = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id serial PRIMARY KEY,
      githubid integer NOT NULL,
      username varchar(100) NOT NULL,
      avatarurl varchar(500) NOT NULL,
      accesstoken varchar(500) NOT NULL
    );
  `

  try {
    const res = await pool.query(createUsersTableQuery)
    console.log('🎉 users table created successfully')
  }
  catch (error) {
    console.error('⚠️ error creating users table', err)
  }
}

const createPhotosUsersTable = async () => {
  const createPhotosUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS photos_users (
      photo_id int NOT NULL,
      user_id int NOT NULL,
      PRIMARY KEY (photo_id, user_id),
      FOREIGN KEY (photo_id) REFERENCES photos(id) ON UPDATE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
    );
  `

  try {
    const res = await pool.query(createPhotosUsersTableQuery)
    console.log('🎉 photos_users table created successfully')
  }
  catch (error) {
    console.error('⚠️ error creating photos_users table', error)
  }
}

const createUsersPhotosTable = async () => {
  const createUsersPhotosTableQuery = `
    CREATE TABLE IF NOT EXISTS users_photos (
      id serial PRIMARY KEY,
      photo_id int NOT NULL,
      username text NOT NULL,
      FOREIGN KEY (photo_id) REFERENCES photos(id)
    );
  `

  try {
      const res = await pool.query(createUsersPhotosTableQuery)
      console.log('🎉 users_photos table created successfully')
  } catch (err) {
      console.error('⚠️ error creating users_photos table', err)
  }
}

const seedPhotosTable = async () => {
  await createPhotosTable()

  photosData.forEach((photo) => {
    const insertQuery = {
      text: 'INSERT INTO photos (title, description, img_url) VALUES ($1, $2, $3)'
    }
  
    const values = [
      photo.title,
      photo.description,
      photo.img_url,
    ]
  
    // Prefer try/catch instead of callback
    // pool.query(insertQuery, values, (err, res) => {
    //   if (err) {
    //     console.error('⚠️ error inserting trip', err)
    //     return
    //   }
  
    //   console.log(`✅ ${trip.title} added successfully`)
    // })
    try {
      pool.query(insertQuery, values)
      console.log(`✅ ${photo.title} added successfully`)
    }
    catch (err) {
      console.error('⚠️ error inserting photo', err)
    }
  
  })
}

seedPhotosTable()
createDestinationsTable()
createPhotosDestinationsTable()
createUsersTable()
createPhotosUsersTable()
createUsersPhotosTable()