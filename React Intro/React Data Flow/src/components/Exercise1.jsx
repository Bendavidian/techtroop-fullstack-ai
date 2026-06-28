import { useState } from 'react'

function Exercise1() {
  const [galleryState, setGalleryState] = useState({
    images: [
      "https://hips.hearstapps.com/hmg-prod/images/lychee-fruit-sugar-1530136136.jpg?crop=1xw:1xh;center,top&resize=640:*",
      "https://hips.hearstapps.com/hmg-prod/images/mango-fruit-sugar-1530136260.jpg?crop=1xw:1xh;center,top&resize=640:*",
      "https://hips.hearstapps.com/hmg-prod/images/cherries-sugar-fruit-1530136329.jpg?crop=1xw:1xh;center,top&resize=640:*"
    ],
    currentImg: 0
  })

  const shiftImageBack = () => {
    setGalleryState({
      ...galleryState,
      currentImg:
        galleryState.currentImg === 0
          ? galleryState.images.length - 1
          : galleryState.currentImg - 1
    })
  }

  const shiftImageForward = () => {
    setGalleryState({
      ...galleryState,
      currentImg:
        galleryState.currentImg === galleryState.images.length - 1
          ? 0
          : galleryState.currentImg + 1
    })
  }

  return (
    <div className="gallery">
      <img
        src={galleryState.images[galleryState.currentImg]}
        alt="Gallery item"
        className="gallery-image"
      />
      <div className="gallery-controls">
        <button className="back" onClick={shiftImageBack}>Previous</button>
        <button className="forward" onClick={shiftImageForward}>Next</button>
      </div>
    </div>
  )
}

export default Exercise1
