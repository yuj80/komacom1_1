import React from 'react';
import { MessageCircle } from 'lucide-react';

declare global {
    interface Window {
        Kakao: any;
    }
}

const KakaoButton: React.FC = () => {
    return (
        <a
            href="http://pf.kakao.com/_Dpxgxjn/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[100] bg-[#FEE500] text-[#191919] p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label="KakaoTalk Consultation"
        >
            <MessageCircle size={32} fill="#191919" />
            <span className="absolute right-full mr-4 bg-white text-zinc-900 px-3 py-1 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Chat with us
            </span>
        </a>
    );
};

export default KakaoButton;
