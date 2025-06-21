// import { useRef, useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Video() {
    // gsap.registerPlugin(ScrollTrigger);

    // const videoRef = useRef(null);
    // const textRef = useRef(null);
    // const triggerRef = useRef(null);

    // useEffect(() => {
    //     const tl = gsap.timeline(
    //         {
    //             scrollTrigger: {
    //                 trigger: triggerRef.current,
    //                 scrub: true,
    //                 start: "top center",
    //                 end: "bottom top",
    //             },
    //         }
    //     );
    //     tl.to(
    //         textRef.current,
    //         {
    //             translateY: -300
    //         },
    //         0
    //     );
    //     tl.to(
    //         videoRef.current,
    //         {
    //             filter: "grayscale(80%)"
    //         },
    //         0
    //     );
    // }, []);

    return (
        <div 
        // ref={triggerRef} 
        className="video-section">
            <div className="video-copy">
                <h1 
                // ref={textRef} 
                className="text-[#ffffff] space-x-2">Ivelis Becker</h1>
            </div>
        </div>
    )
}

export default Video