import React, { useRef, useState } from "react";
import "./style/profile.css";

let imageURL;
function Profile() {

  const [profile, setProfile] = useState(
    "https://via.placeholder.com/55"
  );

  // Hidden input reference
  const fileInputRef = useRef();

  // Image Click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Image Change
  const handleImageChange = (event) => {

    const file = event.target.files[0];

    if (file) {

      imageURL = URL.createObjectURL(file);

      setProfile(imageURL);

    }
  };

  return (

   <nav className="profile-navbar">

     <div className="profile-image-wrapper">

        {/* Profile Image */}
    <img
  src={profile}
  alt="profile"
  onClick={handleImageClick}
  className="profile-image"
/>

        {/* Hidden Input */}
       <input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  className="profile-file-input"
  onChange={handleImageChange}
/>

      </div>

    </nav>
  );
}

export default Profile;