import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const queriedID = params.id

  const [initialized, setInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // TODO: Change this to true when we have login functionality
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [editedPhoto, setEditedPhoto] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  useEffect(() => {
    if (!queriedID) { // you need to have an id to access this page! can't look at generic profile page, must be a specific user
      navigate("/login")
    }
    
    if (!initialized) {
      // TODO: API call here to get the data, then setUserData. Below is a dummy statement.
      /*

       */

      setUserData({
          id: 0,
          username: 'jeremy_padding123',
          name: 'Jeremy Padding',
          image_url: 'https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-01.jpg',
          email_address: 'jeremy_padding123@email.com',
          posted_images: [
            [0, 'https://tinyurl.com/5e7kcc5a'],
            [1, 'https://tinyurl.com/yesanwy8'],
            [2, 'https://tinyurl.com/3f4nzn7z'],
          ],
          liked_images: [
            [0, 'https://tinyurl.com/5e7kcc5a'],
            [1, 'https://tinyurl.com/yesanwy8'],
            [2, 'https://tinyurl.com/3f4nzn7z'],
          ]
        })
      setInitialized(true);
    }
    setEditedPhoto(userData.image_url);
    setEditedName(userData.name);
    setEditedEmail(userData.email_address);

    // Check if the user is logged in (via GitHub!). If not, redirect to the login page.
    const userLoggedIn = true; // temporarily true
    /*

    */
    if (userLoggedIn) {
      setLoggedIn(true);
    }
  
  }, [editMode, userData]);

  const handleConfirm = () => {
    setUserData({
      ...userData,
      name: editedName,
      image_url: editedPhoto,
      email_address: editedEmail,
    });
    // TODO: API call here to insert the data.
    /*

    */

    setEditMode(false);
  };

  if (!initialized) {
    return <p>Loading User Data...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-left">
        {editMode ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Enter Name"
            />
            <input
              type="text"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              placeholder="Enter Email"
            />
            <img
              src={editedPhoto}
              alt="Profile"
              className="profile-image"
            />
            <input
              type="text"
              value={editedPhoto}
              onChange={(e) => setEditedPhoto(e.target.value)}
              placeholder="Enter Image URL"
            />
          </>
        ) : (
          <>
            <img src={userData.image_url} alt="Profile" className="profile-image" />
            <h2>{userData.name}</h2>
            <p>@{userData.username}</p>
            <p>{userData.email_address}</p>
          </>
        )}
      </div>
      <div className="profile-right">
        <div className="scroll-section">
          <h3>Posted Photos</h3>
          <ul>
            {userData.posted_images.map(([id, image], index) => (
              <li key={index}>
                <img src={image} onClick={() => navigate(`/photos/${id}`)} alt={`Posted Photo ${index + 1}` } />
              </li>
            ))}
          </ul>
        </div>
        <div className="scroll-section">
          <h3>Liked Photos</h3>
          <ul>
            {userData.liked_images.map(([id, image], index) => (
              <li key={index}>
                <img src={image} onClick={() => navigate(`/photos/${id}`)} alt={`Liked Photo ${index + 1}` } />
              </li>
            ))}
          </ul>
        </div>
        <div>
          {loggedIn ? (
            editMode ? (<><button onClick={() => handleConfirm()}> Confirm </button></>) :
            (<> <button onClick={() => setEditMode(true)}> Edit Profile </button> </>)) : 
          (<></>)}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;











