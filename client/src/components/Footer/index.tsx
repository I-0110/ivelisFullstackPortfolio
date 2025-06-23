import { useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if(window.history.length > 1) { //Check if there is a previous page in the history stack
      navigate(-1);
    } else {
      navigate('/');
    }
  }
  
  return (
    <footer className="text-center p-4 text-light-text dark:text-dark-text">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-lg m-2 bg-gray-200 text-light-text dark:bg-gray-700 dark:text-dark-text hover:opacity-90 transition"
            onClick={handleGoBack}
          >
            &larr; Go Back
          </button>
        )}
        <h4 className="text-xl font-semibold mb-4">&copy; {new Date().getFullYear()} - Ivelis Becker</h4>
        {/* Tech Stack Badges */}
        <div className="col-span-1 lg:col-span-3 mt-6 flex flex-wrap justify-center gap-4">
          {["JavaScript", "React", "Next.js", "Tailwind", "Node.js", "MongoDB", "TypeScript"].map((tech) => (
            <span key={tech} className="bg-gray-200 px-4 py-2 rounded-full text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
