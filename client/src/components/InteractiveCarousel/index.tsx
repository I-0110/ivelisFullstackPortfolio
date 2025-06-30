import React, { useState, useRef, useEffect } from 'react';

// Handling autoscroll
type CarouselEnds = {
  onScroll?: () => void;
}

const images = [
    // { src: "/ivelisPortfolio.png", alt: "ivelisFullstack", link:'https://ivelisbecker.onrender.com/'},
    { src: "/musicDiary.png", alt: "musicDiary", link: 'https://musicdiary.onrender.com/'},
    { src: "/Munchies.png", alt: "Munchies", link: 'https://munchies-wzp9.onrender.com/'},
    { src: "/theFarm.png", alt: "Farm Management", link: 'https://farm-manager-h9l8.onrender.com/' },
    { src: "/ivelisReact.png", alt: "ivelisReact", link: 'https://ivelisbecker.netlify.app/'},
    { src: "/coffee.png", alt: "Good Coffee Beans", link: 'https://zaccahimba.github.io/GoodCoffeeBeans/index.html' },
    { src: "/ivelisHTML-CSS.png", alt: "ivelisHTML-CSS", link: 'https://i-0110.github.io/IvelisPortfolio/'},
  ];

const InteractiveCarousel: React.FC = ({ onScroll }: CarouselEnds) => {
    const [rotationY, setRotationY] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const isDragging = useRef(false);
    const startX = useRef(0);
    const currentRotation = useRef(0);
    const animationFrame = useRef<number | null>(null);

    // Auto-rotate loop
    useEffect(() => {
        const rotate = () => {
            if (!isPaused && !isDragging.current) {
                currentRotation.current += 0.2;
                setRotationY(currentRotation.current);
            }
            animationFrame.current = requestAnimationFrame(rotate);
        };

        animationFrame.current = requestAnimationFrame(rotate);

        return () => {
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        };
    }, [isPaused]);

    // Mouse Handlers
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

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.touches[0].clientX - startX.current;
    const newRotation = currentRotation.current + deltaX * 0.5;
    setRotationY(newRotation);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    currentRotation.current = rotationY;
    setIsPaused(false);
  };

  return (
    <div className='banner'>
        <button
          onClick={onScroll}
          className='animate-bounce btn btn-lg m-2 bg-dark-headline text-dark-muted hover:opacity-90 transition'
          aria-label='Scroll to About Section'
        >↓</button>
        <h1 className="absolute top-1/3 left-1/3 -translate-x-0 -translate-y-0 z-0 text-3xl sm:text-4xl font-bold text-white drop-shadow-lg pointer-events-none">
            My Projects
        </h1>
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {images.map((img, index) => (
            <div
                className="item"
                key={img.src}
                style={{ ['--position']: index + 1 } as React.CSSProperties}
            >
                <a href={img.link} className='block w-full h-full'>
                    <img src={img.src} alt={img.alt} />
                </a>
            </div>
            ))}
        </div>
    </div>
  );
};

export default InteractiveCarousel;