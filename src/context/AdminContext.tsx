import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

// --- Types ---
export interface PortfolioItem {
    id: number;
    title: string;
    category: 'TV' | 'Radio' | 'PPL' | 'Digital';
    type: 'image' | 'video';
    url: string; // Image URL or Youtube/Video URL
    thumbnail?: string; // For video thumbnails
    color: string; // Gradient class
}

export interface ServiceItem {
    id: number;
    title: string;
    description: string;
    subItems: string[];
}

export interface HistoryItem {
    id: number;
    year: string;
    title: string;
    desc: string;
}

export interface AboutData {
    description: string;
    history: HistoryItem[];
}

export interface ContactData {
    introText: string;
    address: string;
    email: string;
    phone: string;
}

interface AdminContextType {
    isAuthenticated: boolean;
    login: (id: string, pass: string) => boolean;
    logout: () => void;

    // Portfolio
    portfolio: PortfolioItem[];
    addPortfolio: (item: Omit<PortfolioItem, 'id'>) => void;
    updatePortfolio: (item: PortfolioItem) => void;
    deletePortfolio: (id: number) => void;

    // Services
    services: ServiceItem[];
    updateService: (item: ServiceItem) => void;

    // About
    about: AboutData;
    updateAbout: (data: AboutData) => void;
    addHistory: (item: Omit<HistoryItem, 'id'>) => void;
    deleteHistory: (id: number) => void;

    // Contact
    contact: ContactData;
    updateContact: (data: ContactData) => void;
}

// --- Initial Data ---
const INITIAL_PORTFOLIO: PortfolioItem[] = [
    { id: 1, title: 'Summer Campaign', category: 'TV', type: 'image', url: '', color: 'from-blue-500 to-indigo-600' },
    { id: 2, title: 'Morning Show', category: 'Radio', type: 'image', url: '', color: 'from-cyan-400 to-blue-500' },
    { id: 3, title: 'Drama Integration', category: 'PPL', type: 'image', url: '', color: 'from-purple-500 to-pink-500' },
    { id: 4, title: 'Tech Launch', category: 'TV', type: 'image', url: '', color: 'from-orange-400 to-red-500' },
    { id: 5, title: 'Audio Book', category: 'Radio', type: 'image', url: '', color: 'from-purple-500 to-pink-500' },
    { id: 6, title: 'Web Series', category: 'Digital', type: 'image', url: '', color: 'from-pink-500 to-rose-500' },
];

const INITIAL_SERVICES: ServiceItem[] = [
    { id: 1, title: 'Broadcast Media', description: 'Comprehensive planning and execution for TV commercials. From storyboard to final broadcast.', subItems: ['TV Commercials', 'Cable TV Ads', 'IPTV Solutions'] },
    { id: 2, title: 'Radio Marketing', description: 'Engaging audio content that captures listeners. Voice casting, recording, and media buying.', subItems: ['Radio CM', 'Podcast Ads', 'Audio Branding'] },
    { id: 3, title: 'Sponsorship & PPL', description: 'Strategic product placement in drama and variety shows to enhance brand visibility naturally.', subItems: ['Drama PPL', 'Variety Show Sponsorship', 'Virtual Advertising'] },
    { id: 4, title: 'Digital & Interactive', description: 'Full-funnel digital marketing strategies including SNS, YouTube, and interactive web experiences.', subItems: ['YouTube Content', 'Social Media Management', 'Web Development'] },
];

const INITIAL_ABOUT: AboutData = {
    description: 'We are a creative agency that believes in the power of ideas to transform businesses.',
    history: [
        { id: 1, year: '2026', title: 'Global Expansion', desc: 'Opened new branches in Asia.' },
        { id: 2, year: '2024', title: 'Top Agency Award', desc: 'Won Best Digital Agency Award.' },
        { id: 3, year: '2020', title: 'Digital Transformation', desc: 'Shifted focus to comprehensive digital solutions.' },
        { id: 4, year: '2014', title: 'Foundation', desc: 'Komacom established.' },
    ]
};

const INITIAL_CONTACT: ContactData = {
    introText: 'Ready to start your project? Send us a message.',
    address: 'Seoul, Yeongdeungpo-gu, National Assembly-daero 66-gil 23, Sanjeong Building 4F',
    email: 'help@komacom.co.kr | ad@komacom.co.kr',
    phone: '02-1234-5678'
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Data State
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
    const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
    const [about, setAbout] = useState<AboutData>(INITIAL_ABOUT);
    const [contact, setContact] = useState<ContactData>(INITIAL_CONTACT);

    // Load from LocalStorage on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAdmin');
        if (storedAuth === 'true') setIsAuthenticated(true);

        const storedPortfolio = localStorage.getItem('portfolioData');
        if (storedPortfolio) setPortfolio(JSON.parse(storedPortfolio));

        const storedServices = localStorage.getItem('servicesData');
        if (storedServices) setServices(JSON.parse(storedServices));

        const storedAbout = localStorage.getItem('aboutData');
        if (storedAbout) setAbout(JSON.parse(storedAbout));

        const storedContact = localStorage.getItem('contactData');
        if (storedContact) setContact(JSON.parse(storedContact));
    }, []);

    // Sync to LocalStorage
    useEffect(() => localStorage.setItem('portfolioData', JSON.stringify(portfolio)), [portfolio]);
    useEffect(() => localStorage.setItem('servicesData', JSON.stringify(services)), [services]);
    useEffect(() => localStorage.setItem('aboutData', JSON.stringify(about)), [about]);
    useEffect(() => localStorage.setItem('contactData', JSON.stringify(contact)), [contact]);

    // Auth Functions
    const login = (id: string, pass: string) => {
        if (id === 'admin' && pass === '1111') {
            setIsAuthenticated(true);
            localStorage.setItem('isAdmin', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAdmin');
    };

    // Portfolio Functions
    const addPortfolio = (item: Omit<PortfolioItem, 'id'>) => {
        const newItem = { ...item, id: Date.now() };
        setPortfolio(prev => [newItem, ...prev]);
    };

    const updatePortfolio = (updatedItem: PortfolioItem) => {
        setPortfolio(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const deletePortfolio = (id: number) => {
        setPortfolio(prev => prev.filter(item => item.id !== id));
    };

    // Service Functions
    const updateService = (updatedItem: ServiceItem) => {
        setServices(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    // About Functions
    const updateAbout = (data: AboutData) => {
        setAbout(data);
    };

    const addHistory = (item: Omit<HistoryItem, 'id'>) => {
        const newItem = { ...item, id: Date.now() };
        setAbout(prev => ({
            ...prev,
            history: [newItem, ...prev.history].sort((a, b) => parseInt(b.year) - parseInt(a.year)) // Sort by year descending
        }));
    };

    const deleteHistory = (id: number) => {
        setAbout(prev => ({
            ...prev,
            history: prev.history.filter(item => item.id !== id)
        }));
    };

    // Contact Functions
    const updateContact = (data: ContactData) => {
        setContact(data);
    };

    return (
        <AdminContext.Provider value={{
            isAuthenticated, login, logout,
            portfolio, addPortfolio, updatePortfolio, deletePortfolio,
            services, updateService,
            about, updateAbout, addHistory, deleteHistory,
            contact, updateContact
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) throw new Error('useAdmin must be used within an AdminProvider');
    return context;
};
