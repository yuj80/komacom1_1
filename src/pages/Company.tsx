import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';

const Company: React.FC = () => {
    const { about, contact } = useAdmin(); // Access dynamic data

    return (
        <div className="bg-white text-zinc-900 min-h-screen pb-32">
            {/* Header */}
            <div className="pt-32 pb-20 px-6 container mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-zinc-900">About Us</h1>
                <p className="text-xl text-zinc-500 max-w-2xl mx-auto whitespace-pre-line">
                    {about.description}
                </p>
            </div>

            {/* Timeline */}
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="border-l-2 border-zinc-200 pl-8 space-y-20">
                    {about.history.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }} // Faster transition
                            key={item.id}
                            className="relative"
                        >
                            <span className="absolute -left-[41px] top-0 w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow-sm" />
                            <div className="text-5xl font-bold text-blue-100 mb-2 absolute -z-10 -top-8 -left-4 opacity-50 select-none">
                                {item.year}
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mb-1">{item.year}</div>
                            <h3 className="text-2xl font-bold mb-2 text-zinc-900">{item.title}</h3>
                            <p className="text-zinc-500">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Location */}
            <div className="container mx-auto px-6 mt-32">
                <div className="bg-gray-50 border border-zinc-100 rounded-3xl p-8 md:p-16 text-center shadow-sm">
                    <h2 className="text-3xl font-bold mb-8 text-zinc-900">Location</h2>
                    <div className="w-full h-[400px] bg-zinc-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                        {/* Static Map Image Placeholder (for better visuals than just gray) */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700" />
                        <span className="relative z-10 text-zinc-600 font-bold bg-white/80 px-6 py-2 rounded-full backdrop-blur-sm shadow-sm">
                            Map API Integration Area
                        </span>
                    </div>
                    <p className="mt-8 text-zinc-500 font-medium text-lg">
                        {contact.address}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Company;
