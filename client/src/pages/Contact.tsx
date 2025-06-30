import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SUBMIT_CONTACT_FORM } from '../utils/mutations';

const Contact: React.FC = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [submitContactForm] = useMutation(SUBMIT_CONTACT_FORM);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('submitting');

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        try {
            await submitContactForm({
                variables: {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                },
            });

            form.reset();
            setFormState('success');
            alert('Please check your email to confirm your message.');
        } catch (err) {
            console.error(err);
            setFormState('error');
        }
    };

    return (
        <main className="flex flex-col items-center justify-center text-center min-h-screen px-4 space-y-8">
            <section id="contact" className="mt-5 w-[55%] p-6 rounded-lg shadow-lg transition-all duration-300">
                <div className='bg-gradient-to-tl from-[#ffffff] to-gray-200 dark:from-[#03161e] dark:to-gray-200 text-light-text dark:text-dark-text p-6 rounded shadow-md transition-all duration-300'>
                    <h1 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text-100 p-2">Let's Work Together!</h1>
                    <p className="block text-light-100 mt-2 text-center text-sm sm:text-base max-w-xs sm:max-w-md mx-auto transition-all duration-500 ease-in-out">
                        Have a project in mind or just want to connect?
                    </p>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" placeholder="Your Name" required className="btn btn-md m-2 bg-white text-light-text dark:bg-gray-700 dark:text-dark-text hover:opacity-90 transition" />
                        <input  name="email" placeholder="Your Email" required type="email" className="mb-1 btn btn-md m-2 bg-white text-light-text dark:bg-gray-700 dark:text-dark-text hover:opacity-90 transition" />
                        <textarea
                        name="message"
                        placeholder="Tell me about your project. Please describe as much as possible!"
                        required
                        rows={6}
                        className="mb-1 btn btn-lg m-2 bg-white text-light-text dark:bg-gray-700 dark:text-dark-text hover:opacity-90 transition"
                        />

                        <button
                        type="submit"
                        disabled={formState === 'submitting'} className='mb-1 btn btn-lg m-2 bg-white text-light-text dark:bg-gray-700 dark:text-dark-text hover:opacity-90 transition'>
                        {formState === 'submitting' ? 'Sending...' : 'Send'}
                        </button>

                    {formState === 'success' && (
                        <p className="text-green-400 mt-4">✅ ✅ Check your email to confirm.</p>
                    )}
                    {formState === 'error' && (
                        <p className="text-red-400 mt-4">❌ Something went wrong. Please try again.</p>
                    )}
                    </form>
                </div>    
            </section>
            {/* Resume */}
            <section>
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
    );
};

export default Contact;