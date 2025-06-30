import { useRef } from 'react';
import InteractiveCarousel from "../components/InteractiveCarousel";
import { Link } from "react-router-dom";

const Projects = () => {
    const aboutRef = useRef<HTMLDivElement>(null);

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    return (
        <>
            <section className='banner'>
                <br />
                <h4 className="italic text-gray-500 bounce">Click each image to see the project</h4>
                <InteractiveCarousel onScroll={scrollToAbout}/>
            </section>
            <section ref={aboutRef} className='col-span-full text-center mt-8'>
            <h3 className='text-2xl font-semibold text-white'>Let's work together!</h3>
            <p className='text-light-100 mt-2'>Have a project in mind or just want to connect?</p>
        {/* Contact Button */}
            <Link to="/contact" className='btn btn-lg m-2 bg-dark-headline text-dark-muted hover:opacity-90 transition'>Contact Me!</Link>
            {/* Resume */}
            <a
                href='https://docs.google.com/document/d/1OCky6jv6FhjHI1q5MDKZ5xHwvVFgzIIYu_NXd2HO6Yo/edit?usp=sharing'
                target="_blank"
                rel='noopener noreferrer'
                className='flex flex-col items-center text-white mt-4'>
                Get my resume here:
                <img 
                    src='resume.svg'
                    alt='Download Resume'
                    className='icon bg-white'
                /> 
            </a>
            </section>
        </>
    )
};

export default Projects;