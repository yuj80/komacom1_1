import React, { type ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import KakaoButton from '../components/KakaoButton';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-transparent text-zinc-900 font-sans selection:bg-rose-200 selection:text-rose-900">
            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
            <KakaoButton />
        </div>
    );
};

export default Layout;
