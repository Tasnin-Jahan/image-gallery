import React, { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import './ImageGallery.css';

const ImagesGallery = () => {
    const [imagesGallery, setImagesGallery] = useState([]);

    useEffect(() => {
        fetch('./images.json')
            .then((res) => res.json())
            .then((data) => setImagesGallery(data));
    }, []);

    const moveImage = React.useCallback((dragIndex, hoverIndex) => {
        setImagesGallery((prevImages) => {
            const clonedImages = [...prevImages];
            const removedItem = clonedImages.splice(dragIndex, 1)[0];

            clonedImages.splice(hoverIndex, 0, removedItem);
            return clonedImages;
        });
    });

    const countSelectedImages = () => {
        return imagesGallery.filter((imageGallery) => imageGallery.selected).length;
    };

    const handleCheckboxClick = (index) => {
        const updatedImages = [...imagesGallery];
        updatedImages[index].selected = !updatedImages[index].selected;
        setImagesGallery(updatedImages);
    };

    const handleDeleteSelected = () => {
        const updatedImages = imagesGallery.filter((imageGallery) => !imageGallery.selected);
        setImagesGallery(updatedImages);
    };

    const isAnyImageSelected = imagesGallery.some((imageGallery) => imageGallery.selected);

    return (
        <>
            <div className='lg:w-[60%] md:w-[60%] sm:w-auto ' style={{ margin: '0 auto', textAlign: 'center' }}>
                <div className="container relative">
                    <div className="lg:pt-20 lg:border-b lg:border-gray-300">
                        {!isAnyImageSelected && (
                            <h1 className="text-4xl lg:absolute lg:left-10 lg:top-0 lg:pt-5 lg:text-xl md:pl-5 md:text-xl sm:ps-3 sm:text-sm">Gallery</h1>
                        )}
                        {isAnyImageSelected && (
                            <div className="lg:absolute lg:left-10 lg:top-0 lg:pt-5 lg:text-xl md:pl-5 md:text-xl sm:ps-3 sm:text-sm">

                                <div className=''>
                                    <h1 className="text-xl font-bold ">
                                        <FontAwesomeIcon style={{ color: 'blue' }} className='icon' icon={faSquareCheck} />
                                        {countSelectedImages()}
                                        Files Selected</h1>
                                </div>
                            </div>
                        )}
                    </div>
                    {isAnyImageSelected && (
                        <div className="lg:absolute lg:right-10 lg:top-0 lg:pt-5 lg:text-xl md:pr-5 md:text-xl sm:pe-3 sm:text-sm">
                            <button style={{ color: 'red' }} onClick={handleDeleteSelected}>Delete Selected</button>
                        </div>
                    )}
                </div>

                <div className="container">
                    <div className="grid-cols-5 p-20 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3"
                    >
                        {imagesGallery.map((imageGallery, index) => (
                            <ImageGallery
                                key={imageGallery.id}
                                imageGallery={imageGallery}
                                index={index}
                                moveImage={moveImage}
                                imagesGallery={imagesGallery}
                                onCheckboxClick={() => handleCheckboxClick(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImagesGallery;