import { useRef } from 'react';
import Header from '../components/Header';
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

const About = () => {
    const { loading } = useQuery(QUERY_USERS);
    
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex-row justify-center">
            <div className="col-12 col-md-10 my-3">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                <main className="max-w-4xl mx-auto px-4 py-12 text-center lg:text-left">
                    <h2 className='flex flex-col items-center'>About</h2>
                    <Header scrollRef={scrollRef} />
                    <section ref={scrollRef}>
                        <p>
                            I am <strong>Ivelis</strong>, a full-stack developer with a love for crafting clean, elegant UI, and robust backend logic. Though I am new to the tech industry, I bring over a decades of experience as a professional music performance and music educator — where I learned the value of well-structured practice, creative problem-solving, and clear communication (especially when a concert is near by, planning is also key).  
                        </p>

                        <p className="italic text-gray-500">
                            Check more about{" "} 
                            <a 
                            href="https://musicdiary.onrender.com/"
                            className="text-white  underline hover:text-gray-800"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                my musician practice page.
                            </a>
                        </p>


                        <p>
                            My transition into development has been fast-paced and deeply rewarding. I have built projects using technologies like <strong>React, Node.js, Express, TypeScript, MongoDB, PostgreSQL, and more</strong>, with an eye toward clean architecture and mobile-first design. 
                        </p>

                        <p>
                            I approach coding like I approach music: discipline, creativity, and a drive for mastery. Whether it's building UIs or structuring efficient backend logic, I enjoy bringing thoughtful solutions to life — and growing through collaboration and feedback.
                        </p>

                        <p>
                            If you're looking for a developer who's adaptable, enthusiastic, and ready to contribute from day one, I’d love to connect!
                        </p>

                        {/* Contact Button */}
                        <Link to="/contact" className='btn btn-lg m-2 bg-dark-headline text-dark-muted hover:opacity-90 transition'>Let's Work Together →</Link>
                        {/* Resume */}
                        <a
                            href='https://docs.google.com/document/d/1OCky6jv6FhjHI1q5MDKZ5xHwvVFgzIIYu_NXd2HO6Yo/edit?usp=sharing'
                            target="_blank"
                            rel='noopener noreferrer'
                            className='flex flex-col items-center mt-4'>
                            <img 
                                src='resume.svg'
                                alt='Download Resume'
                                className='icon bg-white bounce'
                            />
                        </a>

                        <p>
                            Currently open to <strong>freelance, contract, or full-time opportunities.</strong>
                        </p>
                    </section>
                </main>
                )}
        </div>
      </div>
    );
};

export default About;