import { pool } from '../config/database.js'

const createPhotoUser = async (req, res) => {
  try {
    const photo_id = parseInt(req.params.photo_id)
    const { username } = req.body

    const results = await pool.query(`
      INSERT INTO users_photos (photo_id, username)
      VALUES($1, $2)
      RETURNING *`,
      [photo_id, username]
    )

    res.status(200).json(results.rows[0])
    console.log('🆕 added user to photo')
  }
  catch (error) {
    res.status(409).json( { error: error.message } )
    console.log('Error:', error.message)
  }
}

const getPhotoUsers = async (req, res) => {
  try {
    const photo_id = parseInt(req.params.photo_id)
    const results = await pool.query(
      'SELECT * FROM users_photos WHERE photo_id = $1',
      [photo_id]
    )

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
    console.log('🚫 unable to GET all users (travelers) - Error:', error.message)
  }
}

const getUserPhotos = async (req, res) => {
  try {
    const username = req.params.username
    const results = await pool.query(`
      SELECT photos.* FROM users_photos, photos
      WHERE users_photos.photo_id = photos.id
      AND users_photos.username = $1`,
      [username]
    )

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
    console.log('🚫 unable to GET users photos - Error:', error.message)
  }
}

export default {
  createPhotoUser,
  getPhotoUsers,
  getUserPhotos
}


