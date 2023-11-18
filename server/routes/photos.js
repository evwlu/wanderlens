import express from 'express'

import PhotosController from '../controllers/photos.js'

const router = express.Router()

router.get('/', PhotosController.getPhotos)
router.get('/:id', PhotosController.getPhoto)
router.post('/', PhotosController.createPhoto)
router.delete('/:id', PhotosController.deletePhoto)
router.patch('/:id', PhotosController.updatePhoto)
router.patch('/like/:id', PhotosController.updatePhotoLikes)

export default router