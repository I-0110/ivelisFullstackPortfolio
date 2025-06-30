import { Link } from 'react-router-dom';
import { RefObject } from 'react';
import Video from '../../components/BgVideo';

type HeaderProps = {
  scrollRef: RefObject<HTMLDivElement>;
}

const Header = ({ scrollRef }: HeaderProps) => {
  const handleVideoEnd = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="flex flex-row justify-center">
      <div className="text-center">
        <>
          <Video onEnded={handleVideoEnd} />
          <p className="m-0 bg-dark-headline text-dark-muted hover:opacity-90 transition" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
            Showcasting my work and projects.
          </p>
          <Link className="btn btn-lg m-2 bg-dark-headline text-dark-muted hover:opacity-90 transition" to="/projects">
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
