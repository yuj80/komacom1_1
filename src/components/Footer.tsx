import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

import { useAdmin } from '../context/AdminContext';

const Footer: React.FC = () => {
    const { contact } = useAdmin();
    return (
        <footer className="relative bg-rose-50 text-zinc-900 py-12 md:py-16 overflow-hidden border-t border-rose-100">
            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Branding & CTA */}
                <div>
                    <div className="mb-8">
                        <img src="/logo.jpg" alt="KOMACOM" className="h-10 md:h-12 object-contain mix-blend-multiply" />
                    </div>

                    <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight text-zinc-900 break-keep">
                        {contact.introText.split('\\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < contact.introText.split('\\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </h2>
                    <Link to="/contact" className="inline-block group relative px-8 py-3 bg-rose-600 text-white font-semibold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-rose-300">
                        <span className="relative z-10">프로젝트 문의하기 →</span>
                    </Link>
                </div>

                {/* Right: Info */}
                <div className="space-y-6 text-zinc-600 font-medium">
                    <div className="flex items-start space-x-4">
                        <MapPin className="mt-1 flex-shrink-0 text-rose-500" size={20} />
                        <p>{contact.address}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Mail size={20} className="text-rose-500" />
                        <p>{contact.email}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Phone size={20} className="text-rose-500" />
                        <p>{contact.phone}</p>
                    </div>
                    <div className="pt-8 flex items-center gap-2 text-xs text-zinc-400">
                        <p>Copyright © 2026 KOMA Communication. All Rights Reserved.</p>
                        <a href="/admin/dashboard" className="opacity-20 hover:opacity-100 transition-opacity text-zinc-900" title="Admin Access">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                        </a>
                    </div>
                </div>

            </div>

            {/* 3D Background Placeholder (Soft Light Blur) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-200/50 blur-[120px] rounded-full pointer-events-none" />
        </footer>
    );
};

export default Footer;
