import React, { useEffect, useRef, useState } from "react";
import {FaCamera,FaUpload} from 'react-icons/fa'
// import {IoCloudUpload} from 'react-icons/io'
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
          console.error("Error accessing camera:", error);
        });
    }
  };
  useEffect(() => {
    startCamera();
    return () => {
      setImageData(null);
    };
  }, []);
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL("image/jpeg");
      setImageData(dataURL);

      // Upload the captured image to the API
    }
  };

  const uploadImage = (dataURL) => {
    console.log(dataURL);
    // Call your API to upload the image here
    // You can use libraries like axios or fetch to make the API request
    // Example:
    // fetch('https://api.example.com/upload', {
    //   method: 'POST',
    //   body: JSON.stringify({ image: dataURL }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Image uploaded successfully:', data);
    //     // Reset the camera
    //     setImageData(null);
    //   })
    //   .catch(error => {
    //     console.error('Error uploading image:', error);
    //   });
  };

  const resetCamera = () => {
    setImageData(null);
  };

  return (
    <div className="flex-1 h-full flex-col items-center">
      {!imageData ? (
        <div className="relative h-full w-auto">
          <video ref={videoRef} autoPlay className="w-full h-full" />
          <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
            <div className="w-10 h-10 bg-white rounded-full opacity-70" />
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          <h2 className="text-2xl font-semibold mb-4">Captured Image:</h2>
          <img src={imageData} alt="Captured" className="w-full" />
        </div>
      )}
      <div className="w-full absolute flex justify-center mb-5 items-center bottom-0 h-auto">
        {!imageData ? (
          <button
            onClick={captureImage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-full"
          >
            <FaCamera fontSize={28}/>
          </button>
        ) : (
          <div className="flex flex-col items-center">
          <button
              onClick={() => uploadImage(imageData)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 mx-auto rounded-full mt-2"
            >
              <FaUpload fontSize={28}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPhotos;
