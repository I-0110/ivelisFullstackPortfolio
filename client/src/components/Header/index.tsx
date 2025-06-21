import { Link } from 'react-router-dom';
import { type MouseEvent} from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-background text-text dark:bg-dark-background dark:text-dark-text mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <h3>Welcome to</h3>
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            Ivelis' Portfolio
          </h1>
        </Link>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Showcasting my work and projects.
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg m-2 bg-light-headline text-light-muted dark:bg-dark-headline dark:text-dark-muted hover:opacity-90 transition" to="/projects">
                Ivelis' Projects
              </Link>
              <Link className="btn btn-lg m-2 bg-light-headline text-light-muted dark:bg-dark-headline dark:text-dark-muted hover:opacity-90 transition" to="/me">
                My Projects
              </Link>
              <button className="btn btn-lg m-2 bg-light-headline text-light-muted dark:bg-dark-headline dark:text-dark-muted hover:opacity-90 transition" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg m-2 bg-light-headline text-light-muted dark:bg-dark-headline dark:text-dark-muted hover:opacity-90 transition" to="/projects">
                Projects
              </Link>
              <Link className="btn btn-lg m-2 bg-light-headline text-light-muted dark:bg-dark-headline dark:text-dark-muted hover:opacity-90 transition" to="/signup">
                Hire Me
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
