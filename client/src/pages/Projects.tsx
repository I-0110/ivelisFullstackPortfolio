import InteractiveCarousel from "../components/InteractiveCarousel"

const Projects = () => {
    return (
        <section className='banner'>
            <br />
            <h4 className="italic text-gray-500 bounce">Click each image to see the project</h4>
            <InteractiveCarousel />
        </section>
    )
};

export default Projects;