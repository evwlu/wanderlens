import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/GalleryPage.css';

const GalleryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const galleryCountry = params.country;
  const galleryCity = params.city;
  const [photos, setPhotos] = useState([]);
  const [photoUrlInput, setPhotoUrlInput] = useState('');

  useEffect(() => {
    if (!galleryCountry || !galleryCity) {
      navigate(-1); // go back to the previous page
    }
    // TODO: API call here to get the relevant location's data
    /*
    
    */
    setPhotos([
      [0, 'https://tinyurl.com/5e7kcc5a'],
      [1, 'https://tinyurl.com/yesanwy8'],
      [2, 'https://tinyurl.com/3f4nzn7z'],
      [0, 'https://tinyurl.com/5e7kcc5a'],
      [1, 'https://tinyurl.com/yesanwy8'],
      [2, 'https://tinyurl.com/3f4nzn7z'],
      [0, 'https://tinyurl.com/5e7kcc5a'],
      [1, 'https://tinyurl.com/yesanwy8'],
      [2, 'https://tinyurl.com/3f4nzn7z'],
      [0, 'https://tinyurl.com/5e7kcc5a'],
      [1, 'https://tinyurl.com/yesanwy8'],
      [2, 'https://tinyurl.com/3f4nzn7z'],
      [0, 'https://tinyurl.com/5e7kcc5a'],
      [1, 'https://tinyurl.com/yesanwy8'],
      [2, 'https://tinyurl.com/3f4nzn7z'],
      [0, 'https://tinyurl.com/5e7kcc5a'],
      [1, 'https://tinyurl.com/yesanwy8'],
      [2, 'https://tinyurl.com/3f4nzn7z'],
      [0, 'https://tinyurl.com/5e7kcc5a'],
      [1, 'https://tinyurl.com/yesanwy8'],
      [2, 'https://tinyurl.com/3f4nzn7z'],
      [0, 'https://tinyurl.com/5e7kcc5a'],
      [1, 'https://tinyurl.com/yesanwy8'],
      [2, 'https://tinyurl.com/3f4nzn7z'],
      [0, 'https://tinyurl.com/5e7kcc5a'],
      [1, 'https://tinyurl.com/yesanwy8'],
      [2, 'https://tinyurl.com/3f4nzn7z'],
    ]);
  }, []);

  const onUploadClick = () => {
    // TODO: Handle Photo UPLOAD logic here
    /*

    */
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">{`${galleryCity}, ${galleryCountry}`}</h1>
      <div className="photo-list-container">
        <ul className="photo-list">
          {photos.map(([id, image], index) => (
            <li key={index}>
              <img
                src={image}
                onClick={() => navigate(`/photos/${id}`)}
                alt={`Location Photo ${index + 1}`}
                className="photo"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="upload-container">
        <input className="upload-input" placeholder="Insert PhotoURL Here!"/>
        <button className="upload-button" onClick={() => {onUploadClick()}}>Upload Photo</button>
      </div>
    </div>
  );
};

export default GalleryPage;
