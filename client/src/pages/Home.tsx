import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
// import UserList from '../components/UserList';
import { QUERY_USERS } from '../utils/queries';
import InteractiveCarousel from '../components/InteractiveCarousel';

const Home = () => {
  const { loading, 
    // data 
  } = useQuery(QUERY_USERS);
  // const users = data?.users || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            // <UserList
            //   users={users}
            //   title="Here's the current roster of friends..."
            // />
            <main className='grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-screen-xl mx-auto'>
              {/* Project Display */}
              <section className='banner'>
                <InteractiveCarousel />
                <h2 className=''>Projects</h2>
              </section>
              {/* Video loop under projects */}
              <aside className='flex items-center justify-center'>
                <video src='/hello.mp4' typeof='video/mp4' className='rounded-lg shadow-md w-full max-w-xs' autoPlay muted playsInline/>
              </aside>

              {/* Short: About Me Section */}
              <section className='flex flex-col justify-center space-y-4'>
                <h2 className='text-2xl font-bold'>About Ivelis</h2>
                <p className='text-gray-100'>
                  I'm a full-stack developer passionate about building web apps with clean code and powerful user experiences.
                </p>
                <Link to='/about' className='text-blue-600 hover:underline-transparent font-semibold'>
                  Learn more about me →
                </Link>
              </section>

              {/* Skills Summary */}
              <article className='flex flex-col justify-center space-y-3'>
                <h3 className='text-xl font-semibold text-light-200'>Skills Snapshot</h3>
                <ul className='list-disc list-inside text-light-100'>
                  <li>Frontend: React, NextJS, Tailwind, Bootstrap</li>
                  <li>Backend: Node.js, Express, MongoDB, Python</li>
                  <li>DevOps: CI/CD</li>
                </ul>
              </article>
            </main>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
