import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { LoadingAnimation } from "../LoadingAnimation";
import ShowImage from './ShowImage';
import "./ImgGenerator.css";

const Home = () => {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const postRef = collection(db, "post");
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult]  = useState([]);


  useEffect(() => {
    if(allImages && search) {
      setSearchResult(allImages.filter((item) => item.user.toLowerCase().includes(search) || item.prompt.toLowerCase().includes(search)))
    }
  }, [search])

  useEffect(()=> {
    setLoading(true);
    const getImages = async () => {
      await getDocs(postRef)
      .then(data => {
        setAllImages(data.docs.map((docs) =>({...docs.data(), id: docs.id})))
        setLoading(false);
      })
    }
    getImages();
  }, [])

  return (
    <div className='container'>
      <section >
        <div className='header'>Images</div>
        <div className="search mx-auto">
          <input type='text' name="search" placeholder="Search the prompt..." className="search-input" 
          onChange={e=>setSearch(e.target.value)}
          value={search}
          ></input>
        </div>
        <div>
          {loading? (
            <div>
              <LoadingAnimation/>
            </div>
          ): (
            <div className='row'>
              {search && searchResult ? searchResult.map(post => 
                <div className='col-xl-3 col-sm-4 col-xs-12' key={post.id}>
                  <ShowImage post={post}/>
                </div>)
              :
              allImages && allImages.map(post=>(
                <div className='col-xl-3 col-sm-4 col-xs-12' key={post.id}>
                  <ShowImage post={post}/>
                </div>
              ))} 
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
