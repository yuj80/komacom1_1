import React, { useState } from 'react';
import { Tv, Mic2, Clapperboard, MonitorSmartphone, X, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Reusing SubServiceItem logic
const SubServiceItem = ({ item }: { item: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-default
                ${isHovered
                    ? 'bg-blue-50/50 border-blue-200 shadow-md scale-[1.02]'
                    : 'bg-gray-50 border-gray-100'
                }`}
        >
            <motion.div layout className="p-4 flex items-center gap-4 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${isHovered
                        ? 'bg-blue-600 text-white rotate-12'
                        : 'bg-white text-zinc-300 border border-zinc-200'
                    }`}>
                    <CheckCircle2 size={isHovered ? 20 : 18} />
                </div>

                <h5 className={`text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-blue-900' : 'text-zinc-700'}`}>
                    {item}
                </h5>

                <div className="ml-auto">
                    <ChevronRight size={16} className={`text-zinc-400 transition-transform duration-300 ${isHovered ? 'rotate-90 text-blue-500' : ''}`} />
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
                                고객의 목표 달성을 위해 <strong className="text-blue-700">{item}</strong> 영역에서<br />
                                차별화된 전략과 크리에이티브를 제공합니다.
                            </p>

                            {/* Hover Images */}
                            {(() => {
                                const getImagesForItem = (itemName: string): string[] => {
                                    const text = itemName.toLowerCase().replace(/\s+/g, '');

                                    if (text.includes('인터넷') || text.includes('internet')) {
                                        return ['/internetradio.jpg'];
                                    }

                                    if (text.includes('가상광고')) {
                                        return ['/virtual_ad.jpg'];
                                    }

                                    if (text.includes('tv협찬') || text.includes('티비협찬')) {
                                        return ['/tvppl.jpg'];
                                    }

                                    if (text.includes('radio협찬') || text.includes('라디오협찬')) {
                                        return ['/radioppl.jpg'];
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
                                            <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-sm group/img">
                                                <img
                                                    src={src}
                                                    alt={`${item} preview ${idx + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/10 group-hover/img:bg-transparent transition-colors duration-300" />
                                            </div>
                                        ))}
                                    </motion.div>
                                );
                            })()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-300 pointer-events-none
                ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
        </motion.div>
    );
};

const Business: React.FC = () => {
    const { services } = useAdmin();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const navigate = useNavigate();

    const getIcon = (id: number, size = 40) => {
        switch (id) {
            case 1: return <Tv size={size} />;
            case 2: return <Mic2 size={size} />;
            case 3: return <Clapperboard size={size} />;
            case 4: return <MonitorSmartphone size={size} />;
            default: return <Tv size={size} />;
        }
    };

    return (
        <div className="bg-white text-zinc-900 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-20 text-center text-zinc-900">사업 영역</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            layoutId={`biz-card-${service.id}`}
                            onClick={() => setSelectedId(service.id)}
                            whileHover={{ scale: 0.98 }}
                            className="bg-white border border-zinc-100 rounded-3xl p-10 hover:shadow-xl transition-all duration-300 shadow-sm group cursor-pointer"
                        >
                            <div className="text-blue-600 mb-6 p-4 bg-blue-50 rounded-2xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {getIcon(service.id, 40)}
                            </div>
                            <motion.h3 layoutId={`biz-title-${service.id}`} className="text-3xl font-bold mb-4 text-zinc-900">
                                {service.title}
                            </motion.h3>
                            <motion.p layoutId={`biz-desc-${service.id}`} className="text-zinc-500 mb-8 leading-relaxed">
                                {service.description}
                            </motion.p>
                            <ul className="space-y-2">
                                {service.subItems.map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-zinc-600 font-medium">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* EXPANDED VIEW MODAL */}
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
                        {services.filter(s => s.id === selectedId).map((service) => (
                            <motion.div
                                key={service.id}
                                layoutId={`biz-card-${service.id}`}
                                className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row z-10"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                    className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-zinc-900" />
                                </button>

                                {/* Left Panel */}
                                <div className={`w-full md:w-2/5 p-6 md:p-12 flex flex-col justify-between relative overflow-hidden ${service.id === 4 ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white' :
                                    service.id === 2 ? 'bg-zinc-900 text-white' :
                                        'bg-gray-50 text-zinc-900'
                                    }`}>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
                                            {getIcon(service.id, 32)}
                                        </div>
                                        <motion.h3
                                            layoutId={`biz-title-${service.id}`}
                                            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
                                        >
                                            {service.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`biz-desc-${service.id}`}
                                            className="text-lg opacity-80"
                                        >
                                            {service.description}
                                        </motion.p>
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 opacity-10">
                                        {getIcon(service.id, 200)}
                                    </div>
                                </div>

                                {/* Right Panel */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-full md:w-3/5 p-6 md:p-12 overflow-y-auto bg-white"
                                >
                                    <h4 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-blue-600 rounded-full" />
                                        상세 서비스 항목
                                    </h4>

                                    <div className="grid grid-cols-1 gap-4 mb-10">
                                        {service.subItems.map((item, i) => (
                                            <SubServiceItem key={i} item={item} />
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-gray-100 flex justify-end">
                                        <button
                                            onClick={() => navigate('/contact')}
                                            className="flex items-center gap-2 text-zinc-900 font-bold hover:text-blue-600 transition-colors group"
                                        >
                                            문의하기
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Business;
