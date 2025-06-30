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
        <main>
            <section id="contact" className="w-full max-w-md mx-auto bg-gradient-to-tl from-[#ffffff] to-gray-300 dark:from-[#03161e] dark:to-gray-700 text-light-text dark:text-dark-text p-6 rounded shadow-md transition-all duration-300">
                <div className='flex flex-col items-center space-y-6 mt-10'>
                    <h1 className="text-3xl font-bold">Let's Work Together!</h1>
                    <p className="text-light-100 mt-2">
                        Have a project in mind or just want to connect?
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Honey Pot where bot will fill if email is not good -- no guarantee of perfect email verification */}
                        {/* <input
                            type='text'
                            name='_honey'
                            className='flex flex-none'
                        />
                        {/* reCAPTCHA */}
                        {/* <input 
                            type='hidden'
                            name='_captcha'
                            value='true'
                        /> */}
                        {/* User's form */}
                        <input name="name" placeholder="Your Name" required className="input" />
                        <input  name="email" placeholder="Your Email" required type="email" className="input" />
                        <textarea
                        name="message"
                        placeholder="Tell me about your project. Please describe as much as possible!"
                        required
                        className="input"
                        />

                        <button
                        type="submit"
                        disabled={formState === 'submitting'}>
                        {formState === 'submitting' ? 'Sending...' : 'Sent'}
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