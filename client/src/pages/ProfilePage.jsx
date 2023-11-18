import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const queriedID = params.id
  console.log(queriedID)

  const [editMode, setEditMode] = useState(false);

  // get info from database


  const [userData, setUserData] = useState({
    id: 0,
    username: 'jeremy_padding123',
    name: 'Jeremy Padding',
    image_url: 'https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-01.jpg',
    email_address: 'jeremy_padding123@email.com',
    posted_images: ['https://tinyurl.com/5e7kcc5a', 'https://tinyurl.com/yesanwy8', 'https://tinyurl.com/3f4nzn7z'],
    liked_images: ['https://tinyurl.com/5e7kcc5a', 'https://tinyurl.com/yesanwy8', 'https://tinyurl.com/3f4nzn7z']
  });

  const [editedPhoto, setEditedPhoto] = useState(userData.image_url);
  const [editedName, setEditedName] = useState(userData.name);
  const [editedEmail, setEditedEmail] = useState(userData.email_address);

  useEffect(() => {
    if (!queriedID) {
      navigate("/login")
    }

    if (editMode) {
      setEditedPhoto(userData.image_url);
      setEditedName(userData.name);
      setEditedEmail(userData.email_address);
    }
  }, [editMode, userData]);

  const handleConfirm = () => {
    setUserData({
      ...userData,
      name: editedName,
      image_url: editedPhoto,
      email_address: editedEmail,
    });

    // API call here to insert the data.

    setEditMode(false);
  };

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
            {userData.posted_images.map((image, index) => (
              <li key={index}>
                <img src={image} alt={`Posted Photo ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
        <div className="scroll-section">
          <h3>Liked Photos</h3>
          <ul>
            {userData.liked_images.map((image, index) => (
              <li key={index}>
                <img src={image} alt={`Liked Photo ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          {editMode ? ( <> <button onClick={() => handleConfirm()}> Confirm </button> </>
            ) : (
              <> <button onClick={() => setEditMode(true)}> Edit Profile </button> </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;











