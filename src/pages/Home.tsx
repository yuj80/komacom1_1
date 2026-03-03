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
            <section className="h-[100dvh] w-full relative flex items-center justify-center overflow-hidden">
                <HeroCanvas />

                <div className="z-10 text-center px-4 relative pointer-events-none">
                    {/* Visual handled by HeroCanvas */}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
                >
                    <span className="text-zinc-400 text-sm">아래로 스크롤 ↓</span>
                </motion.div>
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
