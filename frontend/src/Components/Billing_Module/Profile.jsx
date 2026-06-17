import React, { Profiler, useRef, useState } from "react";

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

      const imageURL = URL.createObjectURL(file);

      setProfile(imageURL);

    }
  };

  return (

    <nav className="navbar  px-4 d-flex justify-content-between">

      <div style={{borderRadius:"50%",   border:"2px solid #dee2e6"}}>

        {/* Profile Image */}
        <img
          src={`https://img.icons8.com/color/1200/administrator-male.jpg`}
          alt="profile"
          width="55"
          height="55"
          onClick={handleImageClick}
          className="
            rounded-circle
            object-fit-cover
            border
            border-2
          "
          style={{ cursor: "pointer"}}
        />

        {/* Hidden Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

      </div>

    </nav>
  );
}

export default Profile;