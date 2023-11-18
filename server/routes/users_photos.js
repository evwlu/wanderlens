import express from 'express'
import UsersPhotosController from '../controllers/users_photos.js'

const router = express.Router()

router.post('/create/:photo_id', UsersPhotosController.createPhotoUser)
router.get('/users/:photo_id', UsersPhotosController.getPhotoUsers)
router.get('/photos/:username', UsersPhotosController.getUserPhotos)
 
export default router