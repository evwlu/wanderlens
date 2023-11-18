import { pool } from '../config/database.js'

const createPhotoDestination = async (request, response) => {
  try {
    const { photo_id, destination_id } = request.body
    const results = await pool.query("INSERT INTO photos_destinations (photo_id, destination_id) VALUES($1, $2) RETURNING *",
    [photo_id, destination_id])

    response.status(201).json(results.rows[0])
  }
  catch (error) {
    response.status(409).json({ error: error.message })
  }
}

const getPhotosDestinations = async (request, response) => {
  try {
    const results = await pool.query('SELECT * FROM photos_destinations ORDER BY photo_id ASC')
    response.status(200).json(results.rows)
  } catch (error) {
    response.status(409).json({ error: error.message })
  }
}

const getAllPhotos = async (request, response) => {
  try {
    const query = `
      SELECT *
      FROM photos
      INNER JOIN photos_destinations ON photos_destinations.photo_id = photos.id
      WHERE photos_destinations.destination_id = $1
    `

    const destination_id = parseInt(request.params.destination_id)
    const results = await pool.query(query, [destination_id])
    response.status(200).json(results.rows)
  } catch (error) {
    response.status(409).json({ error: error.message })
  }
}

const getAllDestinations  = async (request, response) => {
  try {
    const query = `
      SELECT *
      FROM destinations
      INNER JOIN photos_destinations ON photos_destinations.destination_id = destinations.id
      WHERE photos_destinations.photo_id = $1
    `

    const photo_id = parseInt(request.params.photo_id)
    const results = await pool.query(query, [photo_id])
    response.status(200).json(results.rows)
  } catch (error) {
    response.status(409).json({ error: error.message })
  }
}

export default {
  createPhotoDestination,
  getPhotosDestinations,
  getAllPhotos,
  getAllDestinations
}