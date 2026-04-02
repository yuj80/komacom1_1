import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import type { PortfolioItem } from '../context/AdminContext';

const getCoverImage = (project: PortfolioItem) => {
    if (project.thumbnail) return project.thumbnail;
    if (!project.url) return '';

    // YouTube Video ID extraction
    const ytMatch = project.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
        return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    }

    // YouTube Community Post handling
    if (project.url.includes('youtube.com/post/')) {
        return 'https://www.gstatic.com/youtube/img/promos/growth/community_post_placeholder_dark.png';
    }

    return project.url;
};

import { PlayCircle } from 'lucide-react';

const categories = ['전체', 'TV', 'Radio', 'PPL', 'ETC'];

const Portfolio: React.FC = () => {
    const { portfolio } = useAdmin();
    const [searchParams] = useSearchParams();
    const initialFilter = searchParams.get('category') || '전체';
    const [filter, setFilter] = useState(initialFilter);
    const navigate = useNavigate();

    // Sync state with URL when URL changes (e.g. navigation from home)
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam && categories.includes(categoryParam)) {
            setFilter(categoryParam);
        }
    }, [searchParams]);

    const handleFilterChange = (cat: string) => {
        setFilter(cat);
    };

    const filteredProjects = filter === '전체'
        ? portfolio
        : portfolio.filter(p => p.category === filter);

    const handleProjectClick = (project: PortfolioItem) => {
        navigate(`/portfolio/${project.id}`);
    };

    return (
        <div className="bg-white text-zinc-900 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-12 text-center text-zinc-900">포트폴리오</h1>

                {/* Filter */}
                <div className="flex justify-center space-x-4 mb-20 flex-wrap gap-y-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleFilterChange(cat)}
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
                                onClick={() => handleProjectClick(project)}
                                className={`aspect-video rounded-2xl bg-zinc-900 relative group overflow-hidden cursor-pointer shadow-lg`}
                            >
                                {/* Background Image */}
                                {getCoverImage(project) ? (
                                    <img
                                        src={getCoverImage(project)}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            if (e.currentTarget.src.includes('maxresdefault.jpg')) {
                                                e.currentTarget.src = e.currentTarget.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
                                            } else if (e.currentTarget.src.includes('community_post_placeholder')) {
                                                 // If even the placeholder fails, just hide it
                                                 e.currentTarget.style.display = 'none';
                                            }
                                        }}
                                    />
                                ) : null}

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} ${getCoverImage(project) ? 'opacity-40 group-hover:opacity-60' : 'opacity-100'} transition-opacity duration-500`} />

                                {/* Thumbnail/Video Indicator */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    {project.type === 'video' && <PlayCircle className="text-white opacity-80 group-hover:scale-110 transition-transform shadow-md rounded-full" size={64} />}
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
