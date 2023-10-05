import React from 'react'
import './file-upload.scss'
import { useState } from 'react';

const FileUpload = ({ formData, updateFormData }) => {
    const [fileName, setFileName] = useState('No file chosen...');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        updateFormData({
          profilePicture: file,
        });
      };
  
    return (
      <div className="file-upload">

        <div className="file-select">
          <div className="file-select-button" id="fileName">
            Choose File
          </div>
          <div className="file-select-name" id="noFile">
            {fileName}
          </div>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
      </div>
    );
  
}

export default FileUpload