import { Link } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  const loggedIn = Auth.loggedIn();
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };
  const user = loggedIn ? Auth.getUser().data : null;

  return (
    <header className="bg-white text-dark mt-[64px] py-3 flex items-center">
      <div className="container flex flex-col justify-space-between-lg justify-center align-center text-center">
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="text-dark" to="/">
                <h1 className="m-0" style={{ fontSize: '3rem' }}>
                  Welcome to My Portfolio
                </h1>
                <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                Showcasing my work and projects.
                </p>
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                View My Projects
              </Link>
            </>
          ) : (
            <>
              <Link className="text-dark" to="/">
                <h1 className="m-0" style={{ fontSize: '3rem' }}>
                  Welcome to My Portfolio
                </h1>
                <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                  Showcasing my work and projects.
                </p>
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
