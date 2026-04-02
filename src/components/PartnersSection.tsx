import React from 'react';
import { useAdmin } from '../context/AdminContext';

const PartnersSection: React.FC = () => {
    const { partners } = useAdmin();

    if (!partners || partners.length === 0) return null;

    // Create a duplicated array so it seamlessly loops.
    // The marquee animation translates from 0 to -50% width.
    const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

    return (
        <section className="py-16 bg-white overflow-hidden border-t border-zinc-100">
            <div className="container mx-auto px-6 mb-8 text-center">
                <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase">Partners</h3>
                <h2 className="text-2xl font-bold mt-2 text-zinc-800">코마와 함께하는 파트너</h2>
            </div>

            <div className="relative w-full flex overflow-hidden">
                <div className="flex animate-marquee min-w-max gap-12 items-center px-6">
                    {duplicatedPartners.map((partner, index) => (
                        <div key={`${partner.id}-${index}`} className="flex-shrink-0 w-32 md:w-48 h-16 md:h-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <img
                                src={partner.logoUrl}
                                alt={partner.name}
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150x80/f4f4f5/a1a1aa?text=No+Image'; }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
