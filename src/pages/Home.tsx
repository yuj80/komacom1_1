import React from 'react';
import HeroCanvas from '../components/canvas/HeroCanvas';
import IntroSection from '../components/IntroSection';
import PortfolioSection from '../components/PortfolioSection';
import ServicesSection from '../components/ServicesSection';
import { motion } from 'framer-motion';

// Particle Text Component
const ParticleText = ({ text, className = "", delay = 0, isGradient = false, control = "visible" }: { text: string, className?: string, delay?: number, isGradient?: boolean, control?: string }) => {
    const characters = Array.from(text);

    return (
        <motion.div
            className={`inline-block whitespace-nowrap ${className}`}
            initial="hidden"
            animate={control}
            variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
                hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
            }}
        >
            {characters.map((char, index) => {
                if (char === " ") return <span key={index} className="inline-block w-4 md:w-8">&nbsp;</span>;

                // Randomize initial position for "gathering" effect
                // Use a pseudo-random based on index to ensure hydration consistency if possible, or just accept render diffs.
                // For simplicity here, we use Math.random inside the component render which is fine for client-only animations mostly,
                // but better to move random generation to a useMemo or variants function if we want it super stable.
                // We'll use a simple deterministic generator based on index for stability.
                const randomX = (index % 2 === 0 ? 1 : -1) * (Math.random() * 500 + 100);
                const randomY = (index % 3 === 0 ? 1 : -1) * (Math.random() * 500 + 100);
                const randomRotate = (Math.random() - 0.5) * 360;
                const randomScale = Math.random() * 2 + 0.5;

                return (
                    <motion.span
                        key={index}
                        className={`inline-block ${isGradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600' : 'text-zinc-900'}`}
                        variants={{
                            hidden: {
                                x: randomX,
                                y: randomY,
                                rotate: randomRotate,
                                opacity: 0,
                                scale: randomScale,
                                filter: "blur(20px)",
                                transition: {
                                    duration: 1.2,
                                    ease: "easeInOut"
                                }
                            },
                            visible: {
                                x: 0,
                                y: 0,
                                rotate: 0,
                                opacity: 1,
                                scale: 1,
                                filter: "blur(0px)",
                                transition: {
                                    type: "spring",
                                    damping: 15,
                                    stiffness: 70,
                                    duration: 1.5
                                }
                            }
                        }}
                    >
                        {char}
                    </motion.span>
                );
            })}
        </motion.div>
    );
};

const Home: React.FC = () => {
    const [animState, setAnimState] = React.useState("visible");

    React.useEffect(() => {
        const loopAnimation = async () => {
            while (true) {
                setAnimState("visible");
                // Wait for animation (approx 2s) + Hold (3s) = 5s
                await new Promise(resolve => setTimeout(resolve, 6000));

                setAnimState("hidden");
                // Wait for scatter animation (approx 1.2s)
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        };
        loopAnimation();
    }, []);

    return (
        <div className="relative">
            {/* SECTION 1: HERO */}
            <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
                <HeroCanvas />

                <div className="z-10 text-center px-4 relative">
                    <div className="mb-2 md:mb-4">
                        <ParticleText
                            text="우리는 광고의"
                            className="text-4xl md:text-8xl font-black tracking-tighter"
                            delay={0.5}
                            control={animState}
                        />
                    </div>

                    <div className="relative">
                        <ParticleText
                            text="흐름을 디자인합니다"
                            className="text-4xl md:text-8xl font-black tracking-tighter"
                            delay={1.5}
                            isGradient={true}
                            control={animState}
                        />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: animState === "visible" ? 1 : 0 }}
                            transition={{ duration: 1, delay: animState === "visible" ? 3.5 : 0 }}
                            className="absolute inset-0 pointer-events-none"
                            aria-hidden="true"
                        >
                            <span className="text-4xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-transparent via-white/50 to-transparent animate-gradient-x bg-[length:200%_auto] absolute inset-0 mx-auto w-fit">
                                흐름을 디자인합니다
                            </span>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
                >
                    <span className="text-zinc-500 text-sm">아래로 스크롤 ↓</span>
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
