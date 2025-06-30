// import React, { useState } from 'react';

interface Package {
    title: string;
    price: string;
    features: string[];
    // emoji: string;
}

const packages: Package[] = [
    {
        // emoji: '✅',
        title: 'Starter Site',
        price: '$100',
        features: [
            '1 Page (HTML/CSS/JS)',
            'Responsive design',
            'Clean layout',
            'Deployment (Netlify or Vercel)',
            '1 Revision', 
        ],
    },
    {
        // emoji: '⚙️',
        title: 'Dynamic Web App',
        price: '$350',
        features: [
            'Up to 5 pages',
            'Front-end with React',
            'Optional backend (Node.js/Express)',
            'Responsive design',
            'Deployment (Render or Vercel)',
            '2 Revisions',
            'Short consultation session (up to 30 minutes)' 
        ],
    },
    {
        // emoji: '🚀',
        title: 'Fullstack Power Package',
        price: '$750',
        features: [
            'Up to 10 pages',
            'Full MERN stack setup',
            'MongoDB or PostgreSQL integration',
            'GraphQL or REST API',
            'Admin dashboard (if needed)',
            'Deployment (Render + optional domain setup)',
            '3 Revisions',
            'Ongoing support (14 days)',
        ],
    },
];

// const faqs = [
//     {
//         question: 'What do I need to provide before we start?',
//         answer:
//         'Share your project idea, examples/inspiration, written content, color palette, and functionality needs. I can guide you if unsure.',
//     },
//     {
//         question: 'Can you redesign or update an existing website?',
//         answer:
//         'Absolutely! I can modernize or rebuild your site using current tech stacks like React or MERN.',
//     },
//     {
//         question: 'Will my website be mobile-friendly?',
//         answer: '100%. All projects are responsive across mobile, tablet, and desktop.',
//     },
//     {
//         question: 'Do you offer ongoing maintenance or updates?',
//         answer:
//         'Yes, I provide post-launch support and can create a long-term collaboration package.',
//     },
//     {
//         question: 'I’m not sure which package I need. Can you help?',
//         answer:
//         'Definitely. Just send me a short description, select "Please Guide Me" and I’ll recommend the best fit (or build a custom quote).',
//     },
// ];

const Services: React.FC = () => {
    // const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    return (
        <section className="px-4 py-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">📦 Service Packages</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {packages.map((pkg, i) => (
                    <div key={i} className="bg-white rounded-lg shadow p-6 flex flex-col">
                        <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                        <p className="text-lg font-bold text-indigo-600 mb-4">{pkg.price}</p>
                        <ul className="flex-1 list-disc list-inside space-y-1 mb-4 text-sm">
                            {pkg.features.map((feature, j) => (
                                <li key={j}>{feature}</li>
                            ))}
                        </ul>
                        <a
                            href="#contact"
                            className="mt-auto inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm text-center"
                        >
                            Request This Package
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
};

export default Services;