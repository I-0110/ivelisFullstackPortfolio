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
        <div className="flex justify-center space-x-6">
          {/* GitHub */}
          <a
            href="https://github.com/I-0110"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-80"
          >
            <img src="/github.svg" alt="GitHub" className="w-6 h-6 invert-0 dark:invert transition duration-300" />
          </a>

          {/* Email */}
          <a
            href="mailto:ivelisbecker@gmail.com"
            className="transition-colors hover:opacity-80"
          >
            <img src="/email.svg" alt="Gmail" className="w-6 h-6 invert-0 dark:invert transition duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
