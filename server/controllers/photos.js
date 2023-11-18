import { pool } from '../config/database.js'

const createPhoto = async (req, res) => {
    try {
        const { title, description, img_url } = req.body

        const results = await pool.query(
            `INSERT INTO photos (title, description, img_url)
      VALUES($1, $2, $3) 
      RETURNING *`,
            [title, description, img_url]
        )

        const photoUser = await pool.query(
            `INSERT INTO users_photos (photo_id, username)
      VALUES($1, $2)
      RETURNING *`,
            [results.rows[0].id, username]
        )

        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getPhotos = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM photos ORDER BY id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getPhoto = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM photos WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updatePhoto = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { title, description, img_url } = req.body
        const results = await pool.query(
            `UPDATE photos
      SET title = $1, description = $2, img_url = $3,
      WHERE id = $4`,
            [title, description, img_url, id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updatePhotoLikes = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { num_votes } = req.body
        const results = await pool.query(
            `UPDATE photos
        SET num_votes = $1
        WHERE id = $2`,
            [parseInt(num_votes), id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deletePhoto = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const user_removal = await pool.query(
            `DELETE FROM users_photos
      WHERE photo_id = $1`,
            [id]
        )

        const photo_cities_deletion = await pool.query(
            `DELETE FROM photos_cities
      WHERE photo_id = $1`,
            [id]
        )

        const results = await pool.query('DELETE FROM photos WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    createPhoto,
    getPhotos,
    getPhoto,
    updatePhoto,
    deletePhoto
}