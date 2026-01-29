import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
    { id: 1, title: 'TV CM', category: 'Video', color: 'from-blue-500 to-indigo-600' },
    { id: 2, title: 'Radio Campaign', category: 'Audio', color: 'from-cyan-400 to-blue-500' },
    { id: 3, title: 'Brand Film', category: 'Video', color: 'from-purple-500 to-pink-500' },
    { id: 4, title: 'Social Media', category: 'Digital', color: 'from-orange-400 to-red-500' },
];

const PortfolioSection = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-gray-50 text-zinc-900">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-10 pl-20 pr-20">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={`group relative h-[400px] w-[600px] md:h-[600px] md:w-[800px] overflow-hidden rounded-3xl bg-gradient-to-br ${project.color} shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[0.98]`}
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center text-white">
                                <h3 className="text-4xl md:text-6xl font-black drop-shadow-md">{project.title}</h3>
                                <p className="mt-4 text-xl font-medium opacity-90">{project.category}</p>
                                <button className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-bold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-md transform translate-y-4 group-hover:translate-y-0">
                                    VIEW PROJECT
                                </button>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="absolute bottom-10 left-10 text-zinc-400 font-medium">
                SCROLL TO EXPLORE
            </div>
        </section>
    );
};

export default PortfolioSection;
