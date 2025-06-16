import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { Source } from 'graphql';
import '../../App.css';

const Header = () => {
  const loggedIn = Auth.loggedIn();
  const user = loggedIn ? Auth.getUser().data : null;

  return (
    <header className="bg-white text-dark">
      {/* Video in text background */}
      <div className='relative w-full h-[50vh] mt-[72px] overflow-hidden flex items-center justify-center'>
        <video className='absolute top-0 left-0 w-full h-full object-cover z-0' autoPlay muted loop playsInline>
          <source src="/bgLight-black.mp4" type="video/mp4" />
        </video>

        {/* Overlay text */}
        <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent'>
          <div className="space-y-7">
          {loggedIn && user ? (
            <>
              <h3 className="text-5xl md:text-6xl font-extrabold uppercase text-white mix-blend-lighten opacity-90">
                Welcome back,
              </h3>
              <h1 className="text-white text-2xl md:text-4xl mt-2">{user.name}</h1>
            </>
          ) : (
            <>
              <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-[url('/bgLight-black.mp4')]">
                Ivelis Becker
              </h1>
              <h3 className="text-9xl font-extrabold text-transparent bg-clip-text bg-[url('/bgLight-black.mp4')]">
                Fullstack Developer
              </h3>
            </>
          )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
