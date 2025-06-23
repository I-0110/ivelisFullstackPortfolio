import React, { useState, useRef } from 'react';

const InteractiveCarousel: React.FC = () => {
    const [rotationY, setRotationY] = useState(0);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const currentRotation = useRef(rotationY);

    const handleMouseDown = (e: React.MouseEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - startX.current;
      const newRotation = currentRotation.current + deltaX * 0.5; // sensitivity
      setRotationY(newRotation); 
    };

    const handleMouseUp = () => {
    isDragging.current = false;
    currentRotation.current = rotationY;
  };

  const images = [
    { src: "/musicDiary.png", alt: "musicDiary" },
    { src: "/Munchies.png", alt: "Munchies" },
    { src: "/theFarm.png", alt: "Farm Management" },
    { src: "/ivelisReact.png", alt: "ivelisReact" },
    { src: "/coffee.png", alt: "Good Coffee Beans" },
    { src: "/ivelisHTML-CSS.png", alt: "ivelisHTML-CSS" },
  ];

  return (
    <div
        className="slider"
        style={{
            transform: `rotateY(${rotationY}deg)`,
            ['--quantity' as any]: images.length,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
    >
        {images.map((img, index) => (
        <div
            className="item"
            key={img.src}
            style={{ ['--position']: index + 1 } as React.CSSProperties}
        >
            <img src={img.src} alt={img.alt} />
        </div>
        ))}
    </div>
  );
};

export default InteractiveCarousel;