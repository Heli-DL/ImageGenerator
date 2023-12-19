import React from 'react'

const ShowImage = (props) => {
  const {image, prompt} = props.post;

  return (
    <div className="card mb-4 box-shadow">
      <img 
        className='card-img-top' 
        src={image} 
        alt={prompt} 
      />
      <div className="card-body">
        <p className='card-text' style={{"fontSize": "14px"}}>{prompt}</p>
      </div>
    </div>
  )
}

export default ShowImage