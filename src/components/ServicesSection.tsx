import { useAdmin } from '../context/AdminContext';
import { motion } from 'framer-motion';
import { Tv, MousePointer2, Mic2, Clapperboard, MonitorSmartphone } from 'lucide-react';

const ServicesSection = () => {
    const { services } = useAdmin();

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
        <section className="bg-white py-32 px-6">
            <div className="container mx-auto">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900">서비스 소개</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        모든 미디어 채널에 걸친 종합 광고 솔루션을 제공합니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
                    {services.map((service, index) => {
                        // Dynamic layout based on index/id for variety, similar to original design

                        // We will map based on the original specialized layout logic roughly
                        // But since we have dynamic data, we'll try to fit them into the grid.
                        // The original had 4 items. We assume 4 items in standard data.

                        let gridClass = "col-span-1 md:col-span-1 md:row-span-1";
                        if (index === 0) gridClass = "col-span-1 md:col-span-2 md:row-span-2 bg-gray-50";
                        else if (index === 1) gridClass = "col-span-1 md:col-span-2 md:row-span-1 bg-zinc-900 text-white";
                        else if (index === 2) gridClass = "col-span-1 md:col-span-1 md:row-span-1 bg-white";
                        else gridClass = "col-span-1 md:col-span-1 md:row-span-1 bg-gradient-to-br from-blue-600 to-blue-800 text-white";

                        const textColor = (index === 1 || index === 3) ? "text-white" : "text-zinc-900";
                        const descColor = (index === 1 || index === 3) ? "text-blue-100/80" : "text-zinc-500";

                        return (
                            <motion.div
                                key={service.id}
                                whileHover={{ scale: 0.98 }}
                                className={`${gridClass} rounded-3xl p-8 flex flex-col justify-between border border-zinc-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all`}
                            >
                                {index === 0 && (
                                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                        {getIcon(service.id)}
                                    </div>
                                )}

                                <div>
                                    {index === 0 && (
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                                            {getSmallIcon(service.id)}
                                        </div>
                                    )}
                                    {index === 3 && <MousePointer2 className="text-white mb-4" size={32} />}

                                    <h3 className={`text-2xl md:text-3xl font-bold ${textColor} mb-2`}>{service.title}</h3>
                                    <p className={`${descColor} text-sm md:text-base`}>{service.description}</p>
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

                                {index === 1 && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-10">
                                        <div className="w-40 h-24 bg-gradient-to-t from-purple-500/20 to-transparent rounded-lg border border-purple-500/30" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
