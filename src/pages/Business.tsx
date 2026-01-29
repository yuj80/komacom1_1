import React from 'react';
import { Tv, Mic2, Clapperboard, MonitorSmartphone } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Business: React.FC = () => {
    const { services } = useAdmin();

    const getIcon = (id: number) => {
        switch (id) {
            case 1: return <Tv size={40} />;
            case 2: return <Mic2 size={40} />;
            case 3: return <Clapperboard size={40} />;
            case 4: return <MonitorSmartphone size={40} />;
            default: return <Tv size={40} />;
        }
    };

    return (
        <div className="bg-white text-zinc-900 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-20 text-center text-zinc-900">사업 영역</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white border border-zinc-100 rounded-3xl p-10 hover:shadow-xl transition-all duration-300 shadow-sm group"
                        >
                            <div className="text-blue-600 mb-6 p-4 bg-blue-50 rounded-2xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {getIcon(service.id)}
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-zinc-900">{service.title}</h3>
                            <p className="text-zinc-500 mb-8 leading-relaxed">
                                {service.description}
                            </p>
                            <ul className="space-y-2">
                                {service.subItems.map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-zinc-600 font-medium">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Business;
