import express from 'express'

import PhotosDestinationsController from '../controllers/photos_destinations.js'

const router = express.Router()

router.get('/', PhotosDestinationsController.getPhotosDestinations)
router.get('/photos/:destination_id', PhotosDestinationsController.getAllPhotos)
router.get('/destinations/:photo_id', PhotosDestinationsController.getAllDestinations)
router.post('/', PhotosDestinationsController.createPhotoDestination)

export default router