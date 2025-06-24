import { Link } from 'react-router-dom';
import Video from '../../components/BgVideo';

const Header = () => {
  return (
    <header className="flex flex-row justify-center">
      <div className="text-center">
        <>
          <Link to="/">
            <Video />
          </Link>
          <p className="m-0 bg-dark-headline text-dark-muted hover:opacity-90 transition" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
            Showcasting my work and projects.
          </p>
          <Link className="btn btn-lg m-2 bg-dark-headline text-dark-muted hover:opacity-90 transition" to="/Home">
            Projects
          </Link>
          <Link className="btn btn-lg m-2 bg-dark-headline text-dark-muted hover:opacity-90 transition" to="/contact">
            Hire Me
          </Link>
        </>
      </div>
    </header>
  );
};

export default Header;
