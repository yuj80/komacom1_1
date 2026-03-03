import { useAdmin } from '../context/AdminContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const IntroSection = () => {
    const { about } = useAdmin();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xLeft = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const xRight = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    return (
        <div ref={containerRef} className="py-32 overflow-hidden bg-transparent text-zinc-900">
            <div className="container mx-auto px-6 mb-20 text-center">
                <p className="text-rose-600 font-bold mb-4">우리의 철학</p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight text-zinc-900">
                    {(about.slogan || "우리는 예술과\\n기술의 간극을 잇습니다.").split('\\n').map((line, i) => (
                        <span key={i}>
                            {line}
                            {i < (about.slogan || "").split('\\n').length - 1 && <br />}
                        </span>
                    ))}
                </h2>
            </div>

            <div className="flex flex-col space-y-4 opacity-100">
                <motion.div
                    style={{ x: xLeft }}
                    className="text-4xl md:text-9xl font-black whitespace-nowrap text-rose-100"
                >
                    아이디어부터 TV 광고까지 라디오에서 목소리로
                </motion.div>
                <motion.div
                    style={{ x: xRight }}
                    className="text-4xl md:text-9xl font-black whitespace-nowrap text-zinc-900"
                >
                    크리에이티브에서 임팩트로 디지털 웨이브
                </motion.div>
                <motion.div
                    style={{ x: xLeft }}
                    className="text-4xl md:text-9xl font-black whitespace-nowrap text-rose-100"
                >
                    새로운 차원을 경험하세요
                </motion.div>
            </div>
        </div>
    );
};

export default IntroSection;
