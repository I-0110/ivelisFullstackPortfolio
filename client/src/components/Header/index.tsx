import { Link } from 'react-router-dom';
import { type MouseEvent} from 'react';
import Auth from '../../utils/auth';
import Video from '../../components/BgVideo';

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="flex flex-row justify-center">
      <div className="text-center">
      {Auth.loggedIn() ? (
        <>
          <h3>Welcome back,</h3>
          <h3><data value="name"></data></h3>
          <Link to="/">
            <Video />
          </Link>
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
          <h3>Hello, my name is</h3>
          <Link to="/">
            <Video />
          </Link>
          <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
            Showcasting my work and projects.
          </p>
          <Link className="btn btn-lg m-2 bg-light-headline text-light-muted dark:bg-dark-headline dark:text-dark-muted hover:opacity-90 transition" to="/projects">
            Projects
          </Link>
          <Link className="btn btn-lg m-2 bg-light-headline text-light-muted dark:bg-dark-headline dark:text-dark-muted hover:opacity-90 transition" to="/signup">
            Hire Me
          </Link>
        </>
      )}
      </div>
    </header>
  );
};

export default Header;
