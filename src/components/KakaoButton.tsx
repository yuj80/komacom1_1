import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

declare global {
    interface Window {
        Kakao: any;
    }
}

const KakaoButton: React.FC = () => {
    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            // ⚠️ REPLACE THIS WITH YOUR ACTUAL JAVASCRIPT KEY FROM KAKAO DEVELOPERS
            // provided credentials cannot be used directly in code for security.
            // You must create an app at https://developers.kakao.com/ and get the JavaScript Key.
            window.Kakao.init('YOUR_JAVASCRIPT_KEY');
        }
    }, []);

    const handleChat = () => {
        if (window.Kakao) {
            window.Kakao.Channel.chat({
                // ⚠️ REPLACE THIS WITH YOUR CHANNEL ID (e.g., _xcLxkx)
                channelPublicId: '_CHANNEL_ID_',
            });
        } else {
            alert('Kakao SDK not loaded.');
        }
    };

    return (
        <button
            onClick={handleChat}
            className="fixed bottom-6 right-6 z-[100] bg-[#FEE500] text-[#191919] p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label="KakaoTalk Consultation"
        >
            <MessageCircle size={32} fill="#191919" />
            <span className="absolute right-full mr-4 bg-white text-zinc-900 px-3 py-1 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Chat with us
            </span>
        </button>
    );
};

export default KakaoButton;
