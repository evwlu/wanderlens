import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PhotoPage.css';

const PhotoPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const photoID = params.id;

  const [photoURL, setPhotoURL] = useState("");
  const [photographer, setPhotographer] = useState("");
  const [location, setLocation] = useState("");
  const [photoOwner, setPhotoOwner] = useState(false); 

  useEffect(() => {
    if (!photoID) {
      navigate(-1); // go back to the previous page
    }
    // TODO: API call here to get the data, then setPhotoURL, setPhotographer, and setLocation. Below are dummy statements.
    /*

    */
    setPhotographer("Jeremy Padding"); // dummy statement
    setLocation("New York, NY"); // dummy statement
    setPhotoURL("https://tinyurl.com/5e7kcc5a"); // dummy statement

    // TODO: Check if the user is the owner of the photo. If so, set photoOwner to true.
    const isOwner = false; // dummy statement
    /*
    
    */
   if (isOwner) {
        setPhotoOwner(true);
   }
  }, []);

  const onPhotoLike = () => {
    // TODO: Handle Photo LIKE logic here
    /*
    
    */
  }

  const onPhotoDelete = () => {
    // TODO: Handle Photo DELETE logic here
    /*
    
    */
    navigate(-1)
  }


  return (
    <div className="photo-page-container">
      <main className="photo-page-main">
        <div className="photo-container">
          <img src={photoURL} alt="Photo" className="page-photo" />
        </div>
        <div className="button-container">
          <button className="back-button" onClick={() => navigate(-1)}> BACK </button>
          <button className="like-button" onClick={() => onPhotoLike()}> LIKE </button>
          { photoOwner ? <button className="delete-button" onClick={() => onPhotoDelete()}> DELETE </button> : null }
        </div>
        <div className="text-container">
          <p className="photographer-text">Photographer: {photographer}</p>
          <p className="location-text">Location: {location}</p>
        </div>
      </main>
    </div>
  );
};

export default PhotoPage;
