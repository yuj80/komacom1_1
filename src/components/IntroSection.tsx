import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const IntroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xLeft = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const xRight = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    return (
        <div ref={containerRef} className="py-32 overflow-hidden bg-white text-zinc-900">
            <div className="container mx-auto px-6 mb-20 text-center">
                <p className="text-blue-600 font-bold mb-4">OUR PHILOSOPHY</p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight text-zinc-900">
                    We bridge the gap between <br />
                    Art and Technology.
                </h2>
            </div>

            <div className="flex flex-col space-y-4 opacity-100">
                <motion.div
                    style={{ x: xLeft }}
                    className="text-6xl md:text-9xl font-black whitespace-nowrap text-zinc-200"
                >
                    TV CM from Idea Radio to Voice
                </motion.div>
                <motion.div
                    style={{ x: xRight }}
                    className="text-6xl md:text-9xl font-black whitespace-nowrap text-zinc-900"
                >
                    Creative to Impact Digital Wave
                </motion.div>
                <motion.div
                    style={{ x: xLeft }}
                    className="text-6xl md:text-9xl font-black whitespace-nowrap text-zinc-200"
                >
                    Experience the New Dimension
                </motion.div>
            </div>
        </div>
    );
};

export default IntroSection;
