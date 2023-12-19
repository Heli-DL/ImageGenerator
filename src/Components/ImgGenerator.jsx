import React, { useState } from "react";
import { API_TOKEN } from "../firebaseConfig";
import "./ImgGenerator.css";
import { LoadingAnimation } from "../LoadingAnimation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";


const ImgGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [user] = useAuthState(auth);
  const postRef = collection(db, "post");
  
  const uploadImage = async () => {
    if(imageFile !== null && prompt !== null) {
      const imageRef = ref(storage, `images/${imageFile.name + v4()}`)
      uploadBytes(imageRef, imageFile)
      .then(()=>{
        getDownloadURL(imageRef)
        .then(url=>{
          addDoc(postRef, {
            prompt: prompt,
            image: url,
            user: user.email
          });
          alert("Posted");
        })
      })
      .catch(error=>{console.log(error);})
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setImageFile(new File([blob], "image.png", {type: "image/png"}));
    setLoading(false);
  };

  const downloadImage =  () => {
    const link = document.createElement("a");
    link.href = output
    link.download = "image.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mt-3 ai-img-generator">
      <div className='header'>Ai image <span>generator</span></div>
      <form className="search" onSubmit={handleSubmit}>
        <input type="text" className="search-input" name="input" placeholder="Type your prompt here..." onChange={(e)=>setPrompt(e.target.value)}/>
        <button type="submit" className="generate-btn">Generate</button>
      </form>
      <div>
      {loading && <div className="loading"><LoadingAnimation/></div>}
      {!loading && output && (
        <div className="result-image">
          <img src={output} alt="art"  />
          <div className="buttons">
            <button onClick={downloadImage} type="button" className="btn download-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
            </button>
            {user && <button onClick={uploadImage} type="button" className="btn save-btn">
             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-floppy" viewBox="0 0 16 16">
                <path d="M11 2H9v3h2z"/>
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
              </svg>
            </button>}
          </div>
        </div>
      )}
      </div>
    </div>
  );
  
};

export default ImgGenerator;

