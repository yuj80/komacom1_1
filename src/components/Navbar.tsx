import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', path: '/company' },
        { name: 'Services', path: '/business' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/70 backdrop-blur-md border-b border-zinc-200 h-16 shadow-sm'
                : 'bg-transparent h-20'
                } flex items-center justify-between px-6 md:px-12`}
        >
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-tighter text-zinc-900 z-50 relative">
                KOMACOM
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className="text-zinc-600 hover:text-black transition-colors text-sm font-medium tracking-wide uppercase"
                    >
                        {link.name}
                    </Link>
                ))}
                <Link
                    to="/contact"
                    className="px-5 py-2 rounded-full border border-black/10 text-zinc-900 text-xs font-semibold hover:bg-black hover:text-white transition-all"
                >
                    문의하기
                </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden text-zinc-900 z-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-2xl text-zinc-900 font-light tracking-wide hover:text-blue-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
