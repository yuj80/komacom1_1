import { motion } from 'framer-motion';
import { Tv, MonitorPlay, MousePointer2 } from 'lucide-react';

const ServicesSection = () => {
    return (
        <section className="bg-white py-32 px-6">
            <div className="container mx-auto">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900">Our Services</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        We provide comprehensive advertising solutions across all media channels.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">

                    {/* Item 1: Broadcast */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="col-span-1 md:col-span-2 md:row-span-2 bg-gray-50 rounded-3xl p-8 flex flex-col justify-between border border-zinc-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Tv size={200} className="text-zinc-900" />
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                                <Tv className="text-white" size={24} />
                            </div>
                            <h3 className="text-3xl font-bold text-zinc-900 mb-2">Broadcast Media</h3>
                            <p className="text-zinc-500">TV Commercials, Radio Campaigns, and Media Planning.</p>
                        </div>
                        <div className="mt-10">
                            <ul className="space-y-2 text-zinc-600 font-medium">
                                <li>• TVC Production</li>
                                <li>• Radio CM</li>
                                <li>• Media Buying</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Item 2: Digital */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="col-span-1 md:col-span-2 md:row-span-1 bg-zinc-900 rounded-3xl p-8 flex items-center justify-between shadow-lg relative overflow-hidden group"
                    >
                        <div className="z-10">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                                <MonitorPlay className="text-white" size={20} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Digital Marketing</h3>
                            <p className="text-zinc-400 text-sm">Youtube, SNS, Display Ads</p>
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-10">
                            {/* Abstract Graph UI */}
                            <div className="w-40 h-24 bg-gradient-to-t from-purple-500/20 to-transparent rounded-lg border border-purple-500/30" />
                        </div>
                    </motion.div>

                    {/* Item 3: PPL */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="col-span-1 md:col-span-1 md:row-span-1 bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm hover:shadow-lg transition-all"
                    >
                        <h3 className="text-xl font-bold text-zinc-900 mb-4">Sponsorship & PPL</h3>
                        <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center border border-zinc-100">
                            <span className="text-zinc-400 font-medium">Content Integration</span>
                        </div>
                    </motion.div>

                    {/* Item 4: OOH / ETC */}
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="col-span-1 md:col-span-1 md:row-span-1 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-lg"
                    >
                        <MousePointer2 className="text-white mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white">Interactive</h3>
                        <p className="text-blue-100/80 text-sm mt-2">Web & 3D Experiences</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
