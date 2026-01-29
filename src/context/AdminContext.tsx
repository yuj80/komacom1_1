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
    slogan: string;
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
    updateCredentials: (newId: string, newPass: string) => void;

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
    updateHistory: (item: HistoryItem) => void;
    deleteHistory: (id: number) => void;

    // Contact
    contact: ContactData;
    updateContact: (data: ContactData) => void;
}

// --- Initial Data ---
const INITIAL_PORTFOLIO: PortfolioItem[] = [
    { id: 1, title: '여름 캠페인', category: 'TV', type: 'image', url: '', color: 'from-blue-500 to-indigo-600' },
    { id: 2, title: '모닝 쇼', category: 'Radio', type: 'image', url: '', color: 'from-cyan-400 to-blue-500' },
    { id: 3, title: '드라마 제작지원', category: 'PPL', type: 'image', url: '', color: 'from-purple-500 to-pink-500' },
    { id: 4, title: '테크 제품 런칭', category: 'TV', type: 'image', url: '', color: 'from-orange-400 to-red-500' },
    { id: 5, title: '오디오북', category: 'Radio', type: 'image', url: '', color: 'from-purple-500 to-pink-500' },
    { id: 6, title: '웹 드라마', category: 'Digital', type: 'image', url: '', color: 'from-pink-500 to-rose-500' },
];

const INITIAL_SERVICES: ServiceItem[] = [
    { id: 1, title: '방송 광고 (Broadcast Media)', description: 'TV 광고를 위한 종합적인 기획 및 실행. 스토리보드부터 최종 송출까지 책임집니다.', subItems: ['TV CF', '케이블 TV 광고', 'IPTV 솔루션'] },
    { id: 2, title: '라디오 마케팅 (Radio Marketing)', description: '청취자의 귀를 사로잡는 매력적인 오디오 콘텐츠. 성우 캐스팅, 녹음, 매체 구매까지.', subItems: ['라디오 CM', '팟캐스트 광고', '오디오 브랜딩'] },
    { id: 3, title: '스폰서십 & PPL', description: '드라마 및 예능 프로그램 내 전략적 제품 노출로 자연스러운 브랜드 인지도 상승 효과.', subItems: ['드라마 PPL', '예능 프로그램 협찬', '가상 광고'] },
    { id: 4, title: '디지털 & 인터랙티브', description: 'SNS, 유튜브, 인터랙티브 웹 경험을 포함한 풀퍼널 디지털 마케팅 전략.', subItems: ['유튜브 콘텐츠', '소셜 미디어 운영', '웹 개발'] },
];

const INITIAL_ABOUT: AboutData = {
    slogan: '우리는 예술과\\n기술의 간극을 잇습니다.',
    description: '우리는 아이디어의 힘으로 비즈니스를 변화시킬 수 있다고 믿는 크리에이티브 에이전시입니다.',
    history: [
        { id: 1, year: '2026', title: '글로벌 확장', desc: '아시아 주요 거점 지사 설립' },
        { id: 2, year: '2024', title: '최우수 에이전시 수상', desc: '베스트 디지털 에이전시 어워드 수상' },
        { id: 3, year: '2020', title: '디지털 트랜스포메이션', desc: '종합 디지털 솔루션으로 사업 영역 확장' },
        { id: 4, year: '2014', title: '설립', desc: '코마커뮤니케이션(KOMACOM) 설립' },
    ]
};

const INITIAL_CONTACT: ContactData = {
    introText: '프로젝트를 시작할 준비가 되셨나요? 언제든 문의해주세요.',
    address: '서울시 영등포구 국회대로 66길 23, 산정빌딩 4층',
    email: 'help@komacom.co.kr | ad@komacom.co.kr',
    phone: '02-1234-5678'
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [adminId, setAdminId] = useState<string>('admin');
    const [adminPass, setAdminPass] = useState<string>('1111');

    // Data State
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
    const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
    const [about, setAbout] = useState<AboutData>(INITIAL_ABOUT);
    const [contact, setContact] = useState<ContactData>(INITIAL_CONTACT);

    // Load from LocalStorage on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAdmin');
        if (storedAuth === 'true') setIsAuthenticated(true);

        const storedId = localStorage.getItem('adminId');
        if (storedId) setAdminId(storedId);

        const storedPass = localStorage.getItem('adminPass');
        if (storedPass) setAdminPass(storedPass);

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

    // Listen for changes from other tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'portfolioData' && e.newValue) setPortfolio(JSON.parse(e.newValue));
            if (e.key === 'servicesData' && e.newValue) setServices(JSON.parse(e.newValue));
            if (e.key === 'aboutData' && e.newValue) setAbout(JSON.parse(e.newValue));
            if (e.key === 'contactData' && e.newValue) setContact(JSON.parse(e.newValue));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Auth Functions
    const login = (id: string, pass: string) => {
        if (id === adminId && pass === adminPass) {
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

    const updateCredentials = (newId: string, newPass: string) => {
        setAdminId(newId);
        setAdminPass(newPass);
        localStorage.setItem('adminId', newId);
        localStorage.setItem('adminPass', newPass);
        alert('계정 정보가 변경되었습니다. 다시 로그인해주세요.');
        logout();
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

    const updateHistory = (updatedItem: HistoryItem) => {
        setAbout(prev => ({
            ...prev,
            history: prev.history.map(item => item.id === updatedItem.id ? updatedItem : item).sort((a, b) => parseInt(b.year) - parseInt(a.year))
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
            isAuthenticated, login, logout, updateCredentials,
            portfolio, addPortfolio, updatePortfolio, deletePortfolio,
            services, updateService,
            about, updateAbout, addHistory, deleteHistory, updateHistory,
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
