import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="relative bg-zinc-100 text-zinc-900 py-16 overflow-hidden border-t border-zinc-200">
            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Branding & CTA */}
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-zinc-900">
                        프로젝트를 <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            시작할 준비가 되셨나요?
                        </span>
                    </h2>
                    <Link to="/contact" className="inline-block group relative px-8 py-3 bg-black text-white font-semibold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-black/20">
                        <span className="relative z-10">프로젝트 문의하기 →</span>
                    </Link>
                </div>

                {/* Right: Info */}
                <div className="space-y-6 text-zinc-600 font-medium">
                    <div className="flex items-start space-x-4">
                        <MapPin className="mt-1 flex-shrink-0 text-zinc-900" size={20} />
                        <p>서울시 영등포구 국회대로 66길 23, 산정빌딩 4층</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Mail size={20} className="text-zinc-900" />
                        <p>help@komacom.co.kr | ad@komacom.co.kr</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Phone size={20} className="text-zinc-900" />
                        <p>02-1234-5678</p>
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-200/20 blur-[120px] rounded-full pointer-events-none" />
        </footer>
    );
};

export default Footer;
