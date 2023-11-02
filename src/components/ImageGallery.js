import React, { useState } from 'react';
import { useDrag, useDrop } from "react-dnd";
import './ImageGallery.css';

const ImageGallery = ({ imageGallery, index, moveImage, onCheckboxClick, imagesGallery }) => {
    const { id, img } = imageGallery;

    const isFirstImage = index === 0; // Check if the index is 0 to style the first image

    const ref = React.useRef(null);

    const [selected, setSelected] = useState(false);

    const [, drop] = useDrop({
        accept: "image",
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveImage(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: "image",
        item: () => {
            return { id, index };
        },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging()
            };
        }
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));


    const [isChecked, setIsChecked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Handle checkbox click
    const handleCheckboxClick = () => {
        onCheckboxClick(index);
        setSelected(!selected);
        setIsChecked(!isChecked);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (!isChecked) {
            setIsHovered(false);
        }
    };

    const selectedClass = selected ? 'selected-image' : '';
    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        console.log("Uploaded File:", file);
    };

    return (
        <>
            <div ref={ref} className={`w-full grid-container ${isFirstImage ? 'col-span-2 row-span-2' : ''} hover:scale-105 border-2 border-gray-300 rounded ${selectedClass}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}

            >
                <div className="relative">
                    <input
                        type="checkbox"
                        className={`absolute top-0 right-0 m-2 ${isHovered || isChecked ? 'block' : 'hidden'}`}
                        checked={isChecked}
                        onChange={handleCheckboxClick}
                    />
                </div>
                <img
                    className={`w-full rounded border-2 border-gray-300 ${selected ? 'selected' : ''}`}
                    src={img}
                    alt=""
                />
            </div>

            {index === imagesGallery.length - 1 && (
                <div className="image-upload">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
            )}
        </>
    );
};

export default ImageGallery;