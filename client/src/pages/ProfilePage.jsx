import React, { useState, useEffect } from 'react';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="Gifts">
      <main>
        <section className="profile">
          <img src="../assets/flayn_logo.png" alt="Profile Picture" className="profile-picture" />
          <h2>John Smith (he/him)</h2>
          <p>johnsmith1987 // jsmith@gmail.com</p>
        </section>
        <section>
          <h3>Pinned Photos:</h3>
          <div className="photo-gallery">
            {/* Pinned photos */}
            <div className="photo"></div>
            <div className="photo"></div>
            <div className="photo"></div>
          </div>
        </section>
        <section>
          <h3>All Photos:</h3>
          <div className="photo-gallery">
            {/* All photos */}
            <div className="photo"></div>
            <div className="photo"></div>
            <div className="photo"></div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;