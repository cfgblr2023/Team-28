const convertBase64ToJpgAndSend = async (base64String) => {
  // Remove the data:image/jpeg;base64 part from the base64 string
  const base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

  // Convert the base64 string to a Blob object
  const blob = b64toBlob(base64Data, "image/jpeg");

  // Create a new FormData instance
  const formData = new FormData();
  formData.append("file", blob, "image.jpg");

  try {
    // Send the FormData object using Fetch with a POST request
    const response = await fetch("create", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      // Request was successful
      const data = await response.json();
      // Handle the response data
    } else {
      // Request failed
      const error = await response.text();
      // Handle the error
    }
  } catch (error) {
    // Fetch request error
    // Handle the error
  }
};

// Helper function to convert base64 string to Blob object
function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
