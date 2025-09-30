import React, { useState } from "react";
import Gallery from "react-photo-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Add the Lightbox styles

const ImageG = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Prepare images for the gallery
  const photos = images.userProfile.map((src) => ({
    src: src,
    width: 400, // Set an appropriate width for your images
    height: 300, // Set an appropriate height for your images
  }));

  const handleClick = (event, { index }) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  return (
    <div>
      {/* Image Gallery */}
      <Gallery photos={photos} onClick={handleClick} />

      {/* Lightbox Preview */}
      {isOpen && (
        <Lightbox
          mainSrc={photos[currentImage].src}
          nextSrc={photos[(currentImage + 1) % photos.length].src}
          prevSrc={photos[(currentImage + photos.length - 1) % photos.length].src}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setCurrentImage((currentImage + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setCurrentImage((currentImage + 1) % photos.length)
          }
        />
      )}
    </div>
  );
};

export default ImageG;
