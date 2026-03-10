import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

const PortfolioSection = () => {
    const { portfolio } = useAdmin();
    const navigate = useNavigate();
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-transparent text-zinc-900">
            <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-10 pl-20 pr-20">
                    {portfolio.map((project) => (
                        <div
                            key={project.id}
                            className={`group relative h-[400px] w-[85vw] md:h-[600px] md:w-[800px] flex-shrink-0 overflow-hidden rounded-3xl bg-zinc-900 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[0.98]`}
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
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} ${getCoverImage(project) ? 'opacity-60 group-hover:opacity-75' : 'opacity-100'} transition-opacity duration-500`} />

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center text-white z-10">
                                <h3 className="text-4xl md:text-6xl font-black drop-shadow-md">{project.title}</h3>
                                <p className="mt-4 text-xl font-medium opacity-90">{project.category}</p>
                                <button
                                    onClick={() => navigate(`/portfolio/${project.id}`)}
                                    className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-bold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-md transform translate-y-4 group-hover:translate-y-0"
                                >
                                    프로젝트 보기
                                </button>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="absolute bottom-10 left-10 text-zinc-400 font-medium">
                스크롤하여 탐색
            </div>
        </section>
    );
};

export default PortfolioSection;
