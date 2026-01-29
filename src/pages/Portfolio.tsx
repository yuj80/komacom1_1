import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { PlayCircle } from 'lucide-react';

const categories = ['All', 'TV', 'Radio', 'PPL', 'Digital'];

const Portfolio: React.FC = () => {
    const { portfolio } = useAdmin();
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? portfolio
        : portfolio.filter(p => p.category === filter);

    const handleProjectClick = (url: string) => {
        if (url) window.open(url, '_blank');
    };

    return (
        <div className="bg-white text-zinc-900 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-12 text-center text-zinc-900">Portfolio</h1>

                {/* Filter */}
                <div className="flex justify-center space-x-4 mb-20 flex-wrap gap-y-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${filter === cat
                                    ? 'bg-black text-white hover:bg-zinc-800'
                                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-gray-50 hover:text-black'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={project.id}
                                onClick={() => handleProjectClick(project.url)}
                                className={`aspect-video rounded-2xl bg-gradient-to-br ${project.color} relative group overflow-hidden cursor-pointer shadow-lg`}
                            >
                                {/* Thumbnail/Video Indicator */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {project.type === 'video' && <PlayCircle className="text-white opacity-80 group-hover:scale-110 transition-transform" size={64} />}
                                </div>

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end pb-8 text-center backdrop-blur-sm">
                                    <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                                    <p className="mt-1 text-sm uppercase tracking-widest text-white/80 font-medium">{project.category}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Portfolio;
