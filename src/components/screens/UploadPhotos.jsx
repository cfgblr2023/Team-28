import React, { useRef, useState } from 'react';

const UploadPhotos = () => {
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const dataURL = canvas.toDataURL('image/jpeg');
      setImageData(dataURL);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button
        onClick={startCamera}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4"
      >
        Start Camera
      </button>
      <button
        onClick={captureImage}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full mt-4"
      >
        Capture Image
      </button>
      {imageData && (
        <div>
          <h2>Captured Image:</h2>
          <img src={imageData} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default UploadPhotos;
