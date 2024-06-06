import React, { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Validate file type (PNG or JPG)
    const acceptedTypes = ['image/png', 'image/jpeg'];
    if (!acceptedTypes.includes(file.type)) {
      alert('Please select a PNG or JPG image file.');
      return;
    }

    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file)); // Generate temporary URL for preview
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a PNG or JPG image file first.');
      return;
    }

    // Implement file upload logic here (consider using libraries like Axios)
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Replace with your actual server-side endpoint for image upload
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      console.log('Image uploaded successfully!');
      // Update state with the actual image URL from the server response
      setImageUrl(data.imageUrl); // Assuming the server returns the uploaded image URL
      setSelectedFile(null); // Clear selection after successful upload
    } else {
      console.error('Error uploading image:', data.error);
      alert('Error uploading image. Please try again.');
    }
  };

const SendRequestToChat= (e) =>{
  try{
    e.preventDefault();
    const response =  axios.post("localhost:8080/askchatgpt", {
      nom : document.getElementById("name").value,
      surname : document.getElementById("surname").value,
      id : document.getElementById("id").value,
      image : document.getElementById("image").value,
    } )
    console.log(response.data);
  } 
  catch(error){
  console.log("Error making the Chat GPT request"+error);
  }
}



  return (
    <div className="h-screen w-screen bg-cover bg-center " style={{ backgroundImage: `url('../public/images/header.png')` }}>
    <div className="image-upload-container h-full flex items-center align-middle justify-center ">
      
      <form onSubmit={SendRequestToChat} class="max-w-sm mx-auto">
  <div class="mb-5">
    <input placeholder='Name' type="name" id="name" class="bg-custom-dark border border-custom-border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-center" required />
  </div>
  <div class="mb-5">

  <input placeholder='Surname' type="surname" id="surname" class="bg-custom-dark border border-custom-border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  placeholder:text-center" required />
  </div>
  <div class="mb-5">

    <input placeholder='Id Number' type="id" id="id" class="bg-custom-dark border border-custom-border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-center" required />
  </div>


  
  <div >
    
      <input
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFileChange}
        className="h-48 bg-slate-800 rounded-lg cursor-pointer"
      />


  </div>
  
  <div className='mt-3 flex justify-center'>

      <button type="submit" class="  text-white bg-gradient-button hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </div>
</form>
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}

    </div>
  </div>
  );
}

export default App;