// import React, { useState, useEffect } from 'react';
// import Image from './Image';
// import './Gallery.css';

// const Gallery = () => {
//     const [images, setImages] = useState([]);
//     const [selectedImages, setSelectedImages] = useState([]);
//     const [featureImage, setFeatureImage] = useState(null);

//     useEffect(() => {
//         // Fetch your image data from images.json
//         fetch('./images.json')
//             .then((response) => response.json())
//             .then((data) => setImages(data))
//             .catch((error) => console.error('Error fetching data:', error));
//     }, []);

//     const handleImageClick = (id) => {
//         // Handle image selection here
//     };

//     const handleImageDelete = () => {
//         // Handle image deletion here
//     };

//     return (
//         <div className="gallery">
//             {images.map((image) => (
//                 <Image
//                     key={image.id}
//                     data={image}
//                     selected={selectedImages.includes(image.id)}
//                     isFeature={featureImage === image.id}
//                     onClick={handleImageClick}
//                 />
//             ))}
//             {/* Add buttons and controls for reordering, deleting, and setting feature images */}
//         </div>
//     );
// };

// export default Gallery;