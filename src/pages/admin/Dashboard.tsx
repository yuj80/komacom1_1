import React, { useState, useEffect } from 'react';
import { useAdmin, type PortfolioItem, type HistoryItem } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, PlayCircle, Image as ImageIcon, Save, Building2, Phone as PhoneIcon, LayoutGrid, Layers } from 'lucide-react';

const Dashboard: React.FC = () => {
    const {
        isAuthenticated, logout,
        portfolio, addPortfolio, deletePortfolio,
        services, updateService,
        about, updateAbout, addHistory, deleteHistory,
        contact, updateContact
    } = useAdmin();

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'portfolio' | 'services' | 'about' | 'contact'>('portfolio');

    // New Item States
    const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
    const [newPortfolio, setNewPortfolio] = useState<Partial<PortfolioItem>>({
        title: '', category: 'TV', type: 'image', url: '', color: 'from-blue-500 to-indigo-600'
    });

    const [isAddingHistory, setIsAddingHistory] = useState(false);
    const [newHistory, setNewHistory] = useState<Partial<HistoryItem>>({
        year: '2026', title: '', desc: ''
    });

    // Check auth
    useEffect(() => {
        if (!isAuthenticated) navigate('/admin/login');
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleAddPortfolio = () => {
        if (newPortfolio.title && newPortfolio.url) {
            addPortfolio(newPortfolio as Omit<PortfolioItem, 'id'>);
            setIsAddingPortfolio(false);
            setNewPortfolio({ title: '', category: 'TV', type: 'image', url: '', color: 'from-blue-500 to-indigo-600' });
        } else {
            alert('제목과 URL은 필수입니다.');
        }
    };

    const handleAddHistory = () => {
        if (newHistory.year && newHistory.title && newHistory.desc) {
            addHistory(newHistory as Omit<HistoryItem, 'id'>);
            setIsAddingHistory(false);
            setNewHistory({ year: '2026', title: '', desc: '' });
        } else {
            alert('연도, 제목, 내용은 필수입니다.');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-zinc-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <h1 className="text-xl font-bold flex items-center">
                    <span className="bg-black text-white px-2 py-1 rounded mr-2 text-sm">ADMIN</span>
                    KOMACOM 관리자
                </h1>
                <button onClick={handleLogout} className="flex items-center text-zinc-500 hover:text-red-600 text-sm font-semibold transition-colors">
                    <LogOut size={16} className="mr-2" /> 로그아웃
                </button>
            </header>

            <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">

                {/* Sidebar Nav (Desktop) / Top Nav (Mobile) */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <nav className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-4 space-y-2 sticky top-24">
                        <button
                            onClick={() => setActiveTab('portfolio')}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center font-bold transition-all ${activeTab === 'portfolio' ? 'bg-blue-50 text-blue-600' : 'text-zinc-500 hover:bg-zinc-50'}`}
                        >
                            <LayoutGrid size={20} className="mr-3" /> 포트폴리오
                        </button>
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center font-bold transition-all ${activeTab === 'services' ? 'bg-blue-50 text-blue-600' : 'text-zinc-500 hover:bg-zinc-50'}`}
                        >
                            <Layers size={20} className="mr-3" /> 서비스 (Business)
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center font-bold transition-all ${activeTab === 'about' ? 'bg-blue-50 text-blue-600' : 'text-zinc-500 hover:bg-zinc-50'}`}
                        >
                            <Building2 size={20} className="mr-3" /> 회사소개 (About)
                        </button>
                        <button
                            onClick={() => setActiveTab('contact')}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center font-bold transition-all ${activeTab === 'contact' ? 'bg-blue-50 text-blue-600' : 'text-zinc-500 hover:bg-zinc-50'}`}
                        >
                            <PhoneIcon size={20} className="mr-3" /> 문의하기 (Contact)
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">

                    {/* --- PORTFOLIO TAB --- */}
                    {activeTab === 'portfolio' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-zinc-900">포트폴리오 관리</h2>
                                <button
                                    onClick={() => setIsAddingPortfolio(!isAddingPortfolio)}
                                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 font-bold text-sm"
                                >
                                    <Plus size={18} className="mr-2" /> 새 프로젝트 추가
                                </button>
                            </div>

                            {isAddingPortfolio && (
                                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-zinc-100 ring-4 ring-blue-50/50">
                                    <h3 className="font-bold mb-4 text-lg">새 프로젝트 등록</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-zinc-500 mb-1">제목</label>
                                            <input className="w-full border p-2.5 rounded-lg bg-zinc-50 focus:bg-white transition-colors" value={newPortfolio.title} onChange={e => setNewPortfolio({ ...newPortfolio, title: e.target.value })} placeholder="프로젝트명" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-zinc-500 mb-1">카테고리</label>
                                            <select className="w-full border p-2.5 rounded-lg bg-zinc-50" value={newPortfolio.category} onChange={e => setNewPortfolio({ ...newPortfolio, category: e.target.value as any })}>
                                                <option value="TV">TV</option><option value="Radio">Radio</option><option value="PPL">PPL</option><option value="Digital">Digital</option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-zinc-500 mb-1">타입</label>
                                            <select className="w-full border p-2.5 rounded-lg bg-zinc-50" value={newPortfolio.type} onChange={e => setNewPortfolio({ ...newPortfolio, type: e.target.value as any })}>
                                                <option value="image">이미지</option><option value="video">비디오 (유튜브)</option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-zinc-500 mb-1">미디어 URL</label>
                                            <input className="w-full border p-2.5 rounded-lg bg-zinc-50" value={newPortfolio.url} onChange={e => setNewPortfolio({ ...newPortfolio, url: e.target.value })} placeholder="https://..." />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-zinc-500 mb-1">배경색 (Tailwind Classes)</label>
                                            <input className="w-full border p-2.5 rounded-lg bg-zinc-50" value={newPortfolio.color} onChange={e => setNewPortfolio({ ...newPortfolio, color: e.target.value })} placeholder="from-blue-500 to-indigo-600" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => setIsAddingPortfolio(false)} className="px-4 py-2 text-zinc-500 hover:bg-zinc-100 rounded-lg">취소</button>
                                        <button onClick={handleAddPortfolio} className="bg-black text-white px-6 py-2 rounded-lg font-bold">등록하기</button>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {portfolio.map((item) => (
                                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden group hover:shadow-md transition-shadow">
                                        <div className={`h-40 bg-gradient-to-br ${item.color} flex items-center justify-center relative`}>
                                            {item.type === 'video' ? <PlayCircle className="text-white opacity-80" size={48} /> : <ImageIcon className="text-white opacity-80" size={48} />}
                                            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-2 rounded-lg backdrop-blur-sm">
                                                <button onClick={() => deletePortfolio(item.id)} className="text-white hover:text-red-400 p-1"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-lg leading-tight">{item.title}</h4>
                                                    <span className="inline-block mt-2 text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded font-medium">{item.category}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-zinc-400 truncate mt-2">{item.url}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- SERVICES TAB --- */}
                    {activeTab === 'services' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold mb-6 text-zinc-900">서비스 콘텐츠 관리</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {services.map((service) => (
                                    <div key={service.id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative overflow-hidden">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold text-blue-600">{service.title}</h3>
                                            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">ID: {service.id}</div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-zinc-700 mb-2">서비스 설명</label>
                                                <textarea
                                                    className="w-full border border-zinc-200 p-4 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all h-24 text-sm"
                                                    value={service.description}
                                                    onChange={(e) => updateService({ ...service, description: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-zinc-700 mb-2">세부 항목 (반점으로 구분)</label>
                                                <input
                                                    className="w-full border border-zinc-200 p-4 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                                                    value={service.subItems.join(', ')}
                                                    onChange={(e) => updateService({ ...service, subItems: e.target.value.split(',').map(s => s.trim()) })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- ABOUT TAB --- */}
                    {activeTab === 'about' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold mb-6 text-zinc-900">회사소개 관리</h2>

                            {/* Main Desc */}
                            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm mb-8">
                                <label className="block text-lg font-bold text-zinc-900 mb-3">메인 소개글</label>
                                <textarea
                                    className="w-full border border-zinc-200 p-4 rounded-xl bg-gray-50 focus:bg-white h-32 text-zinc-700"
                                    value={about.description}
                                    onChange={(e) => updateAbout({ ...about, description: e.target.value })}
                                />
                            </div>

                            {/* History */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-zinc-900">연혁 관리</h3>
                                <button
                                    onClick={() => setIsAddingHistory(!isAddingHistory)}
                                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800"
                                >
                                    + 연혁 추가
                                </button>
                            </div>

                            {isAddingHistory && (
                                <div className="bg-zinc-100 p-6 rounded-xl mb-6 animate-in slide-in-from-top-2">
                                    <div className="grid grid-cols-6 gap-4 mb-4">
                                        <input className="col-span-1 p-2 rounded border" placeholder="연도 (2026)" value={newHistory.year} onChange={e => setNewHistory({ ...newHistory, year: e.target.value })} />
                                        <input className="col-span-2 p-2 rounded border" placeholder="제목" value={newHistory.title} onChange={e => setNewHistory({ ...newHistory, title: e.target.value })} />
                                        <input className="col-span-3 p-2 rounded border" placeholder="내용" value={newHistory.desc} onChange={e => setNewHistory({ ...newHistory, desc: e.target.value })} />
                                    </div>
                                    <button onClick={handleAddHistory} className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">추가하기</button>
                                </div>
                            )}

                            <div className="space-y-4">
                                {about.history.map((item) => (
                                    <div key={item.id} className="bg-white p-4 rounded-xl border border-zinc-200 flex justify-between items-center group">
                                        <div className="flex items-center gap-6">
                                            <span className="text-xl font-black text-blue-600 w-16">{item.year}</span>
                                            <div>
                                                <h4 className="font-bold text-zinc-900">{item.title}</h4>
                                                <p className="text-sm text-zinc-500">{item.desc}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => deleteHistory(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- CONTACT TAB --- */}
                    {activeTab === 'contact' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold mb-6 text-zinc-900">문의하기 정보 관리</h2>
                            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">

                                <div>
                                    <label className="block text-sm font-bold text-zinc-500 mb-2">상단 안내 문구</label>
                                    <input
                                        className="w-full border p-3 rounded-lg bg-zinc-50 focus:bg-white transition-colors"
                                        value={contact.introText}
                                        onChange={(e) => updateContact({ ...contact, introText: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-zinc-500 mb-2">이메일</label>
                                        <input
                                            className="w-full border p-3 rounded-lg bg-zinc-50"
                                            value={contact.email}
                                            onChange={(e) => updateContact({ ...contact, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-zinc-500 mb-2">전화번호</label>
                                        <input
                                            className="w-full border p-3 rounded-lg bg-zinc-50"
                                            value={contact.phone}
                                            onChange={(e) => updateContact({ ...contact, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-zinc-500 mb-2">주소</label>
                                    <input
                                        className="w-full border p-3 rounded-lg bg-zinc-50"
                                        value={contact.address}
                                        onChange={(e) => updateContact({ ...contact, address: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4 border-t border-zinc-100 flex justify-end">
                                    <span className="text-sm text-blue-600 font-medium flex items-center bg-blue-50 px-4 py-2 rounded-full">
                                        <Save size={16} className="mr-2" />
                                        입력 즉시 자동으로 저장됩니다.
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Dashboard;
