import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, MousePointer2, Mic2, Clapperboard, MonitorSmartphone, X, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

const SubServiceItem = ({ item }: { item: string, index?: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-default
                ${isHovered
                    ? 'bg-rose-50/50 border-rose-200 shadow-md scale-[1.02]'
                    : 'bg-white border-zinc-100'
                }`}
        >
            <motion.div layout className="p-4 flex items-center gap-4 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${isHovered
                        ? 'bg-rose-600 text-white rotate-12'
                        : 'bg-white text-zinc-300 border border-zinc-200'
                    }`}>
                    <CheckCircle2 size={isHovered ? 20 : 18} />
                </div>

                <h5 className={`text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-rose-900' : 'text-zinc-700'}`}>
                    {item}
                </h5>

                <div className="ml-auto">
                    <ChevronRight size={16} className={`text-zinc-400 transition-transform duration-300 ${isHovered ? 'rotate-90 text-rose-500' : ''}`} />
                </div>
            </motion.div>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-4 pb-5 pl-[4.5rem]">
                            <p className="text-zinc-600 text-sm leading-relaxed">
                                고객의 목표 달성을 위해 <strong className="text-rose-700">{item}</strong> 영역에서<br />
                                차별화된 전략과 크리에이티브를 제공합니다.
                            </p>

                            {/* Hover Images */}
                            {(() => {
                                const getImagesForItem = (itemName: string): string[] => {
                                    const text = itemName.toLowerCase().replace(/\s+/g, '');

                                    // Check for internet radio specifically first to prevent '라디오' from overriding
                                    if (text.includes('인터넷') || text.includes('internet')) {
                                        return ['/internetradio.jpg'];
                                    }

                                    // Check for TV sponsorship specifically to prevent generic 'tv' or '협찬' from overriding
                                    if (text.includes('tv협찬') || text.includes('티비협찬')) {
                                        return ['/tvppl.jpg'];
                                    }

                                    if (text.includes('라디오')) {
                                        return ['/radio_cm.jpg', '/radio.jpg'];
                                    }

                                    if (text.includes('소셜') || text.includes('media') || text.includes('sns') || text.includes('미디어')) {
                                        return ['/social.jpg'];
                                    }

                                    if (text.includes('오디오')) return ['/radio.jpg'];
                                    if (text.includes('tv') || text.includes('cf') || text.includes('티비')) return ['/tvcf.jpg'];
                                    if (text.includes('ppl') || text.includes('협찬') || text.includes('드라마') || text.includes('예능')) return ['/ppl.jpg'];
                                    if (text.includes('유튜브') || text.includes('youtube') || text.includes('콘텐츠')) return ['/youtube.jpg'];

                                    return [];
                                };
                                const imgArray = getImagesForItem(item);
                                if (imgArray.length === 0) return null;

                                const gridCols = imgArray.length === 1 ? 'grid-cols-1' : imgArray.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';

                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.3 }}
                                        className={`mt-6 grid gap-4 ${gridCols} w-full`}
                                    >
                                        {imgArray.map((src, idx) => (
                                            <div key={idx} className="flex justify-center flex-col items-center group/img relative overflow-hidden rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-zinc-100/50 bg-white">
                                                <div className="w-full aspect-video relative overflow-hidden bg-zinc-50">
                                                    <img
                                                        src={src}
                                                        alt={`${item} 예시 ${idx + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                );
                            })()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative background accent on hover */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100/30 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-300 pointer-events-none
                ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
        </motion.div>
    );
};

const ServicesSection = () => {
    const { services } = useAdmin();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const navigate = useNavigate();

    const getIcon = (id: number) => {
        switch (id) {
            case 1: return <Tv size={200} className="text-zinc-900" />;
            case 2: return <Mic2 size={200} className="text-zinc-900" />;
            case 3: return <Clapperboard size={200} className="text-zinc-900" />;
            case 4: return <MonitorSmartphone size={200} className="text-zinc-900" />;
            default: return <Tv size={200} className="text-zinc-900" />;
        }
    };

    const getSmallIcon = (id: number) => {
        switch (id) {
            case 1: return <Tv className="text-white" size={24} />;
            case 2: return <Mic2 className="text-white" size={24} />;
            case 3: return <Clapperboard className="text-white" size={24} />;
            case 4: return <MonitorSmartphone className="text-white" size={24} />;
            default: return <Tv className="text-white" size={24} />;
        }
    };

    return (
        <section className="bg-transparent py-16 md:py-32 px-6 relative z-10 text-zinc-900">
            <div className="container mx-auto">
                <div className="mb-12 md:mb-20 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900">서비스 소개</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        모든 미디어 채널에 걸친 종합 광고 솔루션을 제공합니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
                    {services.map((service, index) => {
                        let gridClass = "col-span-1 md:col-span-1 md:row-span-1";
                        if (index === 0) gridClass = "col-span-1 md:col-span-2 md:row-span-2 bg-rose-50/50";
                        else if (index === 1) gridClass = "col-span-1 md:col-span-2 md:row-span-1 bg-zinc-900 text-white";
                        else if (index === 2) gridClass = "col-span-1 md:col-span-1 md:row-span-1 bg-white";
                        else gridClass = "col-span-1 md:col-span-1 md:row-span-1 bg-gradient-to-br from-rose-500 to-rose-700 text-white";

                        const textColor = (index === 1 || index === 3) ? "text-white" : "text-zinc-900";
                        const descColor = (index === 1 || index === 3) ? "text-rose-100/80" : "text-zinc-500";

                        return (
                            <motion.div
                                key={service.id}
                                layoutId={`card-${service.id}`}
                                onClick={() => setSelectedId(service.id)}
                                whileHover={{ scale: 0.98 }}
                                className={`${gridClass} rounded-3xl p-6 md:p-8 flex flex-col justify-between border shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-rose-900/20 transition-all cursor-pointer`}
                            >
                                {index === 0 && (
                                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                        {getIcon(service.id)}
                                    </div>
                                )}

                                <div>
                                    {index === 0 && (
                                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-rose-200">
                                            {getSmallIcon(service.id)}
                                        </div>
                                    )}
                                    {index === 3 && <MousePointer2 className="text-white mb-4" size={32} />}

                                    <motion.h3
                                        layoutId={`title-${service.id}`}
                                        className={`text-2xl md:text-3xl font-bold ${textColor} mb-2`}
                                    >
                                        {service.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`desc-${service.id}`}
                                        className={`${descColor} text-sm md:text-base`}
                                    >
                                        {service.description}
                                    </motion.p>
                                </div>

                                {(index === 0) && (
                                    <div className="mt-10">
                                        <ul className="space-y-2 text-zinc-600 font-medium">
                                            {service.subItems.slice(0, 3).map((sub, i) => (
                                                <li key={i}>• {sub}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}


                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* EXPANDED VIEW */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
                        {/* BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* CARD */}
                        {services.filter(s => s.id === selectedId).map((service) => {
                            // Re-calculate basic styles to match the original card for smooth transition
                            // Or default to a nice white/clean detailed view regardless of original card color?
                            // Let's keep the theme consistant but make it cleaner for text reading.
                            // Actually better to have a consistent "Modal" style for readability, 
                            // maybe inheriting some accent colors.

                            // Let's use a standard clean modal look but with dynamic accents

                            return (
                                <motion.div
                                    key={service.id}
                                    layoutId={`card-${service.id}`}
                                    className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row text-zinc-900"
                                >
                                    {/* Close Button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 bg-black/10 hover:bg-black/20 text-zinc-900 rounded-full transition-colors backdrop-blur-sm"
                                    >
                                        <X size={24} />
                                    </button>

                                    {/* Left Panel: Visual / Title */}
                                    <div className={`w-full md:w-2/5 p-6 md:p-12 flex flex-col justify-between relative overflow-hidden ${service.id === 4 ? 'bg-gradient-to-br from-rose-500 to-rose-700 text-white' :
                                        service.id === 2 ? 'bg-zinc-900 text-white' :
                                            'bg-rose-50/50 text-zinc-900'
                                        }`}>
                                        <div className="relative z-10">
                                            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
                                                {getSmallIcon(service.id)}
                                            </div>
                                            <motion.h3
                                                layoutId={`title-${service.id}`}
                                                className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
                                            >
                                                {service.title}
                                            </motion.h3>
                                            <motion.p
                                                layoutId={`desc-${service.id}`}
                                                className="text-lg opacity-80"
                                            >
                                                {service.description}
                                            </motion.p>
                                        </div>

                                        {/* Background Decoration */}
                                        <div className="absolute -bottom-10 -right-10 opacity-10">
                                            {getIcon(service.id)}
                                        </div>
                                    </div>

                                    {/* Right Panel: Details */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="w-full md:w-3/5 p-6 md:p-12 overflow-y-auto bg-white"
                                    >
                                        <h4 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                            <div className="w-1 h-6 bg-rose-600 rounded-full" />
                                            상세 서비스 항목
                                        </h4>

                                        <div className="grid grid-cols-1 gap-4 mb-10">
                                            {service.subItems.map((item, i) => (
                                                <SubServiceItem key={i} item={item} index={i} />
                                            ))}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-gray-100 flex justify-end">
                                            <button
                                                onClick={() => navigate('/contact')}
                                                className="flex items-center gap-2 text-zinc-900 font-bold hover:text-rose-600 transition-colors group"
                                            >
                                                문의하기
                                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ServicesSection;
