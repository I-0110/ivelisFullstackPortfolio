import { Link } from 'react-router-dom';
import { useState, type MouseEvent} from 'react';
import Auth from '../../utils/auth';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="flex items-center justify-between border-b py-2 px-4 sm:px-8 bg-black font-sans min-h-[50px] tracking-wide relative z-50">
        <div className="flex items-center gap-4 w-full text-white">
        
        {/* Left: Title */}
        <div className='flex items-center space-x-4'>
            <Link to="/" className='flex items-center gap-4 hover:opacity-80 transition'>
                <h3 className="text-white text-lg font-bold">
                Fullstack Developer
                </h3>
            </Link>
        </div>

        {/* Hamburger Button (small screens only) */}
        <div className="ml-auto lg:hidden">
        <button
            className="relative w-8 h-8 flex items-center justify-center lg:hidden group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
        > ☰
        </button>
        </div>

        {/* Menu - responsive */}
        <div
        className={`${
            menuOpen ? 'flex' : 'hidden'
            } flex-col lg:flex-row lg:flex items-center gap-4 absolute lg:static top-full right-0 w-full lg:w-auto bg-black lg:bg-transparent px-4 pt-4 pb-6 lg:p-0 z-50`}
        >
        <Link className="m-2 text-white" to="/">Home</Link>
        <Link className="m-2 text-white" to="/about">About</Link>
        <Link className="m-2 text-white" to="/home">Resume PDF</Link>

        {Auth.loggedIn() ? (
            <>
            <Link className="m-2 text-white" to="/me">My Projects</Link>
            <button
                className="btn m-2 bg-white text-black px-3 py-1 rounded"
                onClick={logout}
            >
                Logout
            </button>
            </>
        ) : (
            <>
            <Link className="m-2 text-white" to="/projects">Projects</Link>
            <Link className="m-2 text-white" to="/hire">Hire Me</Link>
            <Link className="btn m-2 bg-white text-black px-3 py-1 rounded" to="/login">
                Login
            </Link>
            <Link className="btn m-2 bg-white text-black px-3 py-1 rounded" to="/signup">
                Signup
            </Link>
            </>
        )}
        </div>
    </div>
    </nav>
  );
};

export default Nav;
