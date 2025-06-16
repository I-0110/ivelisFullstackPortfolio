import { Link } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from '../../utils/auth';

const Nav = () => {
    const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
    };
    return (
        <nav className='bg-white text-dark w-full flex justify-between items-center px-6 py-4 shadow-md fixed top-0 z-50'>
            <Link to='/' className='text-xl font-bold'>
                Home
            </Link>
            <Link to='/About' className='text-xl font-bold'>
                About
            </Link>
            <Link to='/Projects' className='text-xl font-bold'>
                Projects
            </Link>
            <div className="flex gap-4">
                {Auth.loggedIn() ? (
                    <>
                    <Link className="btn btn-sm btn-primary" to="/me">
                        Pending Projects
                    </Link>
                    <button className="btn btn-sm btn-light" onClick={logout}>
                        Logout
                    </button>
                    </>
                ) : (
                    <>
                    <Link className="btn btn-sm btn-primary" to="/login">
                        Login
                    </Link>
                    <Link className="btn btn-sm btn-light" to="/signup">
                        Signup
                    </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
