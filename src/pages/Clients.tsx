import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { motion } from 'framer-motion';

const Clients: React.FC = () => {
    const { clients } = useAdmin();

    return (
        <div className="bg-zinc-50 text-zinc-900 min-h-screen pb-32 pt-20">
            {/* Header */}
            <div className="pt-24 pb-20 px-6 text-center bg-white border-b border-zinc-100 mb-16 shadow-sm">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-extrabold mb-6 text-zinc-900 tracking-tight"
                >
                    Our Clients
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-zinc-500 max-w-2xl mx-auto"
                >
                    코마와 함께하는 소중한 클라이언트입니다.
                </motion.p>
            </div>

            {/* Grid Layout */}
            <div className="container mx-auto px-6 max-w-6xl">
                {clients && clients.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 place-items-center">
                        {clients.map((client, index) => (
                            <motion.div 
                                key={client.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="w-full flex items-center justify-center p-2 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-zinc-100 aspect-video group overflow-hidden"
                            >
                                <img
                                    src={client.logoUrl}
                                    alt={client.name}
                                    className="w-full h-full object-contain scale-125 transition-all duration-300 group-hover:scale-150"
                                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150x80/f4f4f5/a1a1aa?text=No+Image'; }}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-zinc-400">
                        등록된 클라이언트가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Clients;
