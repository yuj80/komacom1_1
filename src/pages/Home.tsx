import React from 'react';
import HeroCanvas from '../components/canvas/HeroCanvas';
import IntroSection from '../components/IntroSection';
import PortfolioSection from '../components/PortfolioSection';
import ServicesSection from '../components/ServicesSection';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
    return (
        <div className="relative">
            {/* SECTION 1: HERO */}
            <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
                <HeroCanvas />

                <div className="z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 drop-shadow-sm"
                    >
                        WE DESIGN <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            THE WAVE OF AD
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
                    >
                        <span className="text-zinc-500 text-sm">SCROLL DOWN ↓</span>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: INTRO */}
            <IntroSection />

            {/* SECTION 3: PORTFOLIO */}
            <PortfolioSection />

            {/* SECTION 4: SERVICES */}
            <ServicesSection />
        </div>
    );
};

export default Home;
