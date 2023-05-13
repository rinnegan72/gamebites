import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArPTL6P3k8-3DL3XiMz0Rs7bJLvUwYwtY",
  authDomain: "assignment1-f3aa3.firebaseapp.com",
  projectId: "assignment1-f3aa3",
  storageBucket: "assignment1-f3aa3.appspot.com",
  messagingSenderId: "905914804519",
  appId: "1:905914804519:web:ec21c105bc7cdd96f66102"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(app);

document.getElementById("FirstQuestion").addEventListener("click", () => {
  console.log("1111");

  // Create a storage reference from our storage service
  const storageRef = ref(storage, 'images/book1.jpg');

  // URL of the image to download
  const url = "https://pbs.twimg.com/media/EzBRlxxWQAoi09Q?format=jpg&name=small";
  console.log("222222222221111");
  // Download the image data
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      // Upload the image data to Cloud Storage
      const uploadTask = uploadBytesResumable(storageRef, blob);
      console.log("33333333331111");
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );
    });
});
