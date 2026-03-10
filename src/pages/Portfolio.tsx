import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import type { PortfolioItem } from '../context/AdminContext';

const getCoverImage = (project: PortfolioItem) => {
    if (project.thumbnail) return project.thumbnail;
    if (!project.url) return '';

    // YouTube ID extraction regex (handles youtu.be, youtube.com/watch, embed, etc.)
    const ytMatch = project.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);

    if (ytMatch && ytMatch[1]) {
        return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
    }

    // If it's not a youtube url, assume it's a direct image URL
    return project.url;
};
import { PlayCircle, X } from 'lucide-react';

const categories = ['전체', 'TV', 'Radio', 'PPL', 'Digital'];

const Portfolio: React.FC = () => {
    const { portfolio } = useAdmin();
    const [searchParams] = useSearchParams();
    const initialFilter = searchParams.get('category') || '전체';
    const [filter, setFilter] = useState(initialFilter);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const getYoutubeEmbedUrl = (url: string) => {
        const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
        return ytMatch && ytMatch[1] ? `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1` : url;
    };

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
        if (!project.url) return;
        if (project.type === 'video') {
            setSelectedVideo(getYoutubeEmbedUrl(project.url));
        } else {
            window.open(project.url, '_blank');
        }
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

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm"
                    >
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute right-4 top-4 md:right-10 md:top-10 text-white hover:text-zinc-300 transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
                        >
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            <iframe
                                src={selectedVideo}
                                title="YouTube video player"
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;
