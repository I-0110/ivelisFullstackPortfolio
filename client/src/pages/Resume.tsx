import Header from "../components/Header";
import { useRef } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

const Resume = () => {
    const { loading } = useQuery(QUERY_USERS);

    const RESUME_URL = "https://docs.google.com/document/d/e/2PACX-1vTGQphl364LlMKbbjX3DZsxCwrjA5--3cOOipBstFhp9Ulx84nEHkwszSPFCkggInkH9b0z3okkxkux/pub?embedded=true";

    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="max-w-5xl mx-auto p-6">
            <h2 className='flex flex-col items-center'>Resume</h2>

            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 my-3">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                    <Header scrollRef={scrollRef} />
                    <div ref={scrollRef}>
                        <iframe
                        src={RESUME_URL}
                        className="w-full h-[600px]"
                        title="Ivelis Resume"
                        />
                    </div>
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
                </>
            )} 
            </div>
        </div>
    </section>
)};

export default Resume;