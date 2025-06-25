import { Link } from 'react-router-dom';
import Header from '../components/Header';

import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import InteractiveCarousel from '../components/InteractiveCarousel';

const Home = () => {
  const { loading } = useQuery(QUERY_USERS);

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <main className='grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-screen-xl mx-auto'>
              <h2 className='flex flex-col items-center'>Hello, my name is</h2>
              <Header />
              {/* Project Display */}
              <section className='banner'>
                <InteractiveCarousel />
              </section>
              <br />
              <div className='grid grid-cols-3 gap-6 items-center'>
                {/* Left-Short: About Me Section */}
                <section className='flex flex-col justify-center space-y-4'>
                  <h2 className='text-2xl font-bold'>About Ivelis</h2>
                  <p className='text-gray-100'>
                    I'm a full-stack developer passionate about building web apps with clean code and powerful user experiences.
                  </p>
                  <Link to='/about' className='btn btn-lg m-2 bg-dark-headline text-dark-muted hover:opacity-90 transition'>
                    Learn more about me →
                  </Link>
                </section>

                {/* Center: Video loop under projects */}
                <aside className='flex items-center justify-center h-full'>
                  <video 
                    src='/hello.mp4'
                    className='h-full max-h-[250px] w-full max-w-[150px] rounded-full object-cover' 
                    autoPlay 
                    muted 
                    playsInline
                    loop
                  />
                </aside>

                {/* Right: Skills Summary */}
                <section className='flex flex-col justify-center space-y-3'>
                  <h2 className='text-xl font-semibold'>Skills Snapshot</h2>
                  <ul className='list-disc list-inside'>
                    <li>Frontend: React, NextJS, Tailwind, Bootstrap</li>
                    <li>Backend: Node.js, Express, MongoDB, Python</li>
                    <li>DevOps: CI/CD</li>
                  </ul>
                  <br />
                  <Link to='/contact' className='btn btn-lg m-2 bg-dark-headline text-dark-muted hover:opacity-90 transition'>
                    Hire Me Now →
                  </Link>
                </section>
              </div>
              <br />
              {/* Conclusion of presentation */}
              <section className='col-span-full text-center mt-8'>
                <h3 className='text-2xl font-semibold text-white'>Let's work together!</h3>
                <p className='text-light-100 mt-2'>Have a project in mind or just want to connect?</p>
                {/* Contact Button */}
                <Link to="/contact" className='btn btn-lg m-2 bg-dark-headline text-dark-muted hover:opacity-90 transition'>Contact Me!</Link>
                {/* Resume */}
                <a
                    href='https://docs.google.com/document/d/1OCky6jv6FhjHI1q5MDKZ5xHwvVFgzIIYu_NXd2HO6Yo/edit?usp=sharing'
                    target="_blank"
                    rel='noopener noreferrer'
                    className='flex flex-col items-center text-white mt-4'>
                    Get my resume here:
                    <img 
                        src='resume.svg'
                        alt='Download Resume'
                        className='icon bg-white'
                    /> 
                </a>
              </section>
            </main>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
