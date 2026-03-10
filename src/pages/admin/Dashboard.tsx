import React, { useState, useEffect } from 'react';
import { useAdmin, type PortfolioItem, type HistoryItem, type ContactData, type ClientItem } from '../../context/AdminContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Plus, Trash2, PlayCircle, Image as ImageIcon, Save, Building2, Phone as PhoneIcon, LayoutGrid, Layers, Settings, Edit2, X, ExternalLink } from 'lucide-react';

const Dashboard: React.FC = () => {
    const {
        isAuthenticated, logout,
        portfolio, addPortfolio, deletePortfolio, updatePortfolio,
        services, updateService,
        about, updateAbout, addHistory, deleteHistory, updateHistory,
        contact, updateContact,
        clients, addClient, updateClient, deleteClient,
        updateCredentials
    } = useAdmin();

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'portfolio' | 'services' | 'about' | 'contact' | 'clients' | 'settings'>('portfolio');

    // New Item States
    const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
    const [editingPortfolioId, setEditingPortfolioId] = useState<number | null>(null);
    const [newPortfolio, setNewPortfolio] = useState<Partial<PortfolioItem>>({
        title: '', category: 'TV', type: 'image', url: '', color: 'from-blue-500 to-indigo-600', detailImages: [], content: ''
    });

    const [isAddingHistory, setIsAddingHistory] = useState(false);
    const [editingHistoryId, setEditingHistoryId] = useState<number | null>(null);
    const [newHistory, setNewHistory] = useState<Partial<HistoryItem>>({
        year: '2026', title: '', desc: ''
    });

    const [isAddingClient, setIsAddingClient] = useState(false);
    const [editingClientId, setEditingClientId] = useState<number | null>(null);
    const [newClient, setNewClient] = useState<Partial<ClientItem>>({
        name: '', logoUrl: ''
    });

    // Settings State
    const [newAdminId, setNewAdminId] = useState('');
    const [newAdminPass, setNewAdminPass] = useState('');

    // Contact Edit State
    const [editingContact, setEditingContact] = useState<ContactData>(contact);

    useEffect(() => {
        setEditingContact(contact);
    }, [contact]);

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
            if (editingPortfolioId) {
                updatePortfolio({ ...newPortfolio, id: editingPortfolioId } as PortfolioItem);
                setEditingPortfolioId(null);
            } else {
                addPortfolio(newPortfolio as Omit<PortfolioItem, 'id'>);
            }
            setIsAddingPortfolio(false);
            setNewPortfolio({ title: '', category: 'TV', type: 'image', url: '', color: 'from-blue-500 to-indigo-600', detailImages: [], content: '' });
        } else {
            alert('제목과 URL은 필수입니다.');
        }
    };

    const startEditPortfolio = (item: PortfolioItem) => {
        setNewPortfolio(item);
        setEditingPortfolioId(item.id);
        setIsAddingPortfolio(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddHistory = () => {
        if (newHistory.year && newHistory.title && newHistory.desc) {
            if (editingHistoryId) {
                updateHistory({ ...newHistory, id: editingHistoryId } as HistoryItem);
                setEditingHistoryId(null);
            } else {
                addHistory(newHistory as Omit<HistoryItem, 'id'>);
            }
            setIsAddingHistory(false);
            setNewHistory({ year: '2026', title: '', desc: '' });
        } else {
            alert('연도, 제목, 내용은 필수입니다.');
        }
    };

    const startEditHistory = (item: HistoryItem) => {
        setNewHistory(item);
        setEditingHistoryId(item.id);
        setIsAddingHistory(true);
    };

    const handleAddClient = () => {
        if (newClient.name && newClient.logoUrl) {
            if (editingClientId) {
                updateClient({ ...newClient, id: editingClientId } as ClientItem);
                setEditingClientId(null);
            } else {
                addClient(newClient as Omit<ClientItem, 'id'>);
            }
            setIsAddingClient(false);
            setNewClient({ name: '', logoUrl: '' });
        } else {
            alert('클라이언트명과 로고 URL은 필수입니다.');
        }
    };

    const startEditClient = (item: ClientItem) => {
        setNewClient(item);
        setEditingClientId(item.id);
        setIsAddingClient(true);
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

            <div className="bg-blue-50/50 border-b border-blue-100 py-3 px-8 text-center text-sm text-blue-800 flex justify-center items-center gap-3">
                <span>⚠️ 수정 사항은 '저장' 또는 '적용/수정하기' 버튼을 눌러야 반영됩니다.</span>
                <Link to="/" target="_blank" className="font-bold underline flex items-center hover:text-blue-600">
                    <ExternalLink size={14} className="mr-1" />
                    홈페이지에서 확인하기
                </Link>
            </div>

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
                        <button
                            onClick={() => setActiveTab('clients')}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center font-bold transition-all ${activeTab === 'clients' ? 'bg-blue-50 text-blue-600' : 'text-zinc-500 hover:bg-zinc-50'}`}
                        >
                            <ImageIcon size={20} className="mr-3" /> 클라이언트 (Clients)
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-zinc-500 hover:bg-zinc-50'}`}
                        >
                            <Settings size={20} className="mr-3" /> 설정 (Settings)
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
                                    onClick={() => {
                                        setIsAddingPortfolio(!isAddingPortfolio);
                                        setEditingPortfolioId(null);
                                        setNewPortfolio({ title: '', category: 'TV', type: 'image', url: '', color: 'from-blue-500 to-indigo-600', detailImages: [], content: '' });
                                    }}
                                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 font-bold text-sm"
                                >
                                    {isAddingPortfolio ? <X size={18} className="mr-2" /> : <Plus size={18} className="mr-2" />}
                                    {isAddingPortfolio ? '취소' : '새 프로젝트 추가'}
                                </button>
                            </div>

                            {isAddingPortfolio && (
                                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-zinc-100 ring-4 ring-blue-50/50">
                                    <h3 className="font-bold mb-4 text-lg">{editingPortfolioId ? '프로젝트 수정' : '새 프로젝트 등록'}</h3>
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
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-zinc-500 mb-1">상세 레이아웃 추가 이미지 링크들 (엔터키로 구분)</label>
                                            <textarea className="w-full border p-2.5 rounded-lg bg-zinc-50 min-h-[100px]" value={newPortfolio.detailImages?.join('\n') || ''} onChange={e => setNewPortfolio({ ...newPortfolio, detailImages: e.target.value.split('\n').filter(url => url.trim() !== '') })} placeholder="https://image1.jpg&#10;https://image2.jpg" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-zinc-500 mb-1">본문 설명 내용 (선택 옵션)</label>
                                            <textarea className="w-full border p-2.5 rounded-lg bg-zinc-50 min-h-[80px]" value={newPortfolio.content} onChange={e => setNewPortfolio({ ...newPortfolio, content: e.target.value })} placeholder="프로젝트에 대한 추가적인 설명이 필요할 경우 작성하세요." />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => { setIsAddingPortfolio(false); setEditingPortfolioId(null); }} className="px-4 py-2 text-zinc-500 hover:bg-zinc-100 rounded-lg">취소</button>
                                        <button onClick={handleAddPortfolio} className="bg-black text-white px-6 py-2 rounded-lg font-bold">{editingPortfolioId ? '수정하기' : '등록하기'}</button>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {portfolio.map((item) => (
                                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden group hover:shadow-md transition-shadow">
                                        <div className={`h-40 bg-gradient-to-br ${item.color} flex items-center justify-center relative`}>
                                            {item.type === 'video' ? <PlayCircle className="text-white opacity-80" size={48} /> : <ImageIcon className="text-white opacity-80" size={48} />}
                                            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-2 rounded-lg backdrop-blur-sm">
                                                <button onClick={() => startEditPortfolio(item)} className="text-white hover:text-blue-400 p-1"><Edit2 size={16} /></button>
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
                                        <div className="flex justify-between items-start mb-6 gap-4">
                                            <div className="flex-grow">
                                                <label className="block text-xs font-bold text-zinc-400 mb-1">카테고리명 (제목)</label>
                                                <input
                                                    className="w-full text-xl md:text-2xl font-bold text-blue-600 border-b border-zinc-200 focus:border-blue-500 bg-transparent px-2 py-1 transition-colors"
                                                    value={service.title}
                                                    onChange={(e) => updateService({ ...service, title: e.target.value })}
                                                />
                                            </div>
                                            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 mt-2">ID: {service.id}</div>
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
                            <div className="mt-8 flex justify-end pb-8">
                                <button
                                    onClick={() => alert('서비스 카테고리 정보가 성공적으로 적용되었습니다.')}
                                    className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center hover:bg-zinc-800 transition-colors shadow-lg"
                                >
                                    <Save size={18} className="mr-2" />
                                    서비스 변경사항 적용하기
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- ABOUT TAB --- */}
                    {activeTab === 'about' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold mb-6 text-zinc-900">회사소개 관리</h2>

                            {/* Main Desc */}
                            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm mb-8 space-y-6">
                                <div>
                                    <label className="block text-lg font-bold text-zinc-900 mb-2">메인 슬로건 (홈 화면)</label>
                                    <p className="text-sm text-zinc-500 mb-2">줄바꿈은 \n 으로 입력해주세요.</p>
                                    <input
                                        className="w-full border border-zinc-200 p-4 rounded-xl bg-gray-50 focus:bg-white text-zinc-900 font-bold"
                                        value={about.slogan || ''}
                                        onChange={(e) => updateAbout({ ...about, slogan: e.target.value })}
                                        placeholder="우리는 예술과\n기술의 간극을 잇습니다."
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-bold text-zinc-900 mb-3">회사 소개글 (Company 페이지)</label>
                                    <textarea
                                        className="w-full border border-zinc-200 p-4 rounded-xl bg-gray-50 focus:bg-white h-32 text-zinc-700"
                                        value={about.description}
                                        onChange={(e) => updateAbout({ ...about, description: e.target.value })}
                                    />
                                </div>
                                <div className="pt-4 border-t border-zinc-100 flex justify-end">
                                    <button
                                        onClick={() => alert('회사 소개 정보가 성공적으로 적용되었습니다.')}
                                        className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center hover:bg-zinc-800 transition-colors shadow-lg"
                                    >
                                        <Save size={18} className="mr-2" />
                                        회사 소개 변경사항 적용하기
                                    </button>
                                </div>
                            </div>

                            {/* History */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-zinc-900">연혁 관리</h3>
                                <button
                                    onClick={() => {
                                        setIsAddingHistory(!isAddingHistory);
                                        setEditingHistoryId(null);
                                        setNewHistory({ year: '2026', title: '', desc: '' });
                                    }}
                                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800 flex items-center"
                                >
                                    {isAddingHistory ? <X size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                                    {isAddingHistory ? '취소' : '연혁 추가'}
                                </button>
                            </div>

                            {isAddingHistory && (
                                <div className="bg-zinc-100 p-6 rounded-xl mb-6 animate-in slide-in-from-top-2">
                                    <h4 className="font-bold mb-4">{editingHistoryId ? '연혁 수정' : '새 연혁 등록'}</h4>
                                    <div className="grid grid-cols-6 gap-4 mb-4">
                                        <input className="col-span-2 p-3 rounded-lg border bg-zinc-50" placeholder="연도 (YYYY)" value={newHistory.year} onChange={e => setNewHistory({ ...newHistory, year: e.target.value })} />
                                        <input className="col-span-4 p-3 rounded-lg border bg-zinc-50" placeholder="제목 (ex: 주요 프로젝트)" value={newHistory.title} onChange={e => setNewHistory({ ...newHistory, title: e.target.value })} />
                                        <textarea
                                            className="col-span-6 p-3 rounded-lg border bg-zinc-50 h-32 resize-y whitespace-pre-wrap"
                                            placeholder="내용 (클라이언트 목록 등, 줄바꿈 가능)"
                                            value={newHistory.desc}
                                            onChange={e => setNewHistory({ ...newHistory, desc: e.target.value })}
                                        />
                                    </div>
                                    <button onClick={handleAddHistory} className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">{editingHistoryId ? '수정하기' : '추가하기'}</button>
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
                                        <div className="flex gap-2">
                                            <button onClick={() => startEditHistory(item)} className="text-zinc-300 hover:text-blue-500 transition-colors">
                                                <Edit2 size={20} />
                                            </button>
                                            <button onClick={() => deleteHistory(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
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
                                        value={editingContact.introText}
                                        onChange={(e) => setEditingContact({ ...editingContact, introText: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-zinc-500 mb-2">이메일</label>
                                        <input
                                            className="w-full border p-3 rounded-lg bg-zinc-50"
                                            value={editingContact.email}
                                            onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-zinc-500 mb-2">전화번호</label>
                                        <input
                                            className="w-full border p-3 rounded-lg bg-zinc-50"
                                            value={editingContact.phone}
                                            onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-zinc-500 mb-2">팩스번호</label>
                                        <input
                                            className="w-full border p-3 rounded-lg bg-zinc-50"
                                            value={editingContact.fax || ''}
                                            onChange={(e) => setEditingContact({ ...editingContact, fax: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-zinc-500 mb-2">주소</label>
                                    <input
                                        className="w-full border p-3 rounded-lg bg-zinc-50"
                                        value={editingContact.address}
                                        onChange={(e) => setEditingContact({ ...editingContact, address: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4 border-t border-zinc-100 flex justify-end">
                                    <button
                                        onClick={() => {
                                            updateContact(editingContact);
                                            alert('문의하기 정보가 수정/적용되었습니다.');
                                        }}
                                        className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center hover:bg-zinc-800 transition-colors shadow-lg"
                                    >
                                        <Save size={18} className="mr-2" />
                                        변경사항 적용하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- CLIENTS TAB --- */}
                    {activeTab === 'clients' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-zinc-900">클라이언트 CI 관리</h2>
                                <button
                                    onClick={() => {
                                        setIsAddingClient(!isAddingClient);
                                        setEditingClientId(null);
                                        setNewClient({ name: '', logoUrl: '' });
                                    }}
                                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 font-bold text-sm"
                                >
                                    {isAddingClient ? <X size={18} className="mr-2" /> : <Plus size={18} className="mr-2" />}
                                    {isAddingClient ? '취소' : '새 클라이언트 등록'}
                                </button>
                            </div>

                            {isAddingClient && (
                                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-zinc-100 ring-4 ring-blue-50/50">
                                    <h3 className="font-bold mb-4 text-lg">{editingClientId ? '클라이언트 수정' : '새 클라이언트 등록'}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-zinc-500 mb-1">클라이언트명</label>
                                            <input className="w-full border p-2.5 rounded-lg bg-zinc-50 focus:bg-white transition-colors" value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} placeholder="ex) 삼성전자" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-zinc-500 mb-1">로고 이미지 URL</label>
                                            <input className="w-full border p-2.5 rounded-lg bg-zinc-50 focus:bg-white transition-colors" value={newClient.logoUrl} onChange={e => setNewClient({ ...newClient, logoUrl: e.target.value })} placeholder="https://..." />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => { setIsAddingClient(false); setEditingClientId(null); }} className="px-4 py-2 text-zinc-500 hover:bg-zinc-100 rounded-lg">취소</button>
                                        <button onClick={handleAddClient} className="bg-black text-white px-6 py-2 rounded-lg font-bold">{editingClientId ? '수정하기' : '등록하기'}</button>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {clients.map((item) => (
                                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden group hover:shadow-md transition-shadow relative">
                                        <div className="h-24 bg-zinc-50 flex items-center justify-center p-4">
                                            <img src={item.logoUrl} alt={item.name} className="max-w-full max-h-full object-contain" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150x80/f4f4f5/a1a1aa?text=No+Image'; }} />
                                        </div>
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                            <button onClick={() => startEditClient(item)} className="bg-white/20 text-white p-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => deleteClient(item.id)} className="bg-white/20 text-white p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="p-2 text-center border-t border-zinc-100">
                                            <p className="text-xs font-bold text-zinc-700 truncate">{item.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- SETTINGS TAB --- */}
                    {activeTab === 'settings' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold mb-6 text-zinc-900">관리자 계정 설정</h2>
                            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm max-w-lg">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-zinc-700 mb-2">새 아이디</label>
                                        <input
                                            className="w-full border p-3 rounded-lg bg-zinc-50 focus:bg-white"
                                            value={newAdminId}
                                            onChange={(e) => setNewAdminId(e.target.value)}
                                            placeholder="새로운 아이디 입력"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-zinc-700 mb-2">새 비밀번호</label>
                                        <input
                                            type="password"
                                            className="w-full border p-3 rounded-lg bg-zinc-50 focus:bg-white"
                                            value={newAdminPass}
                                            onChange={(e) => setNewAdminPass(e.target.value)}
                                            placeholder="새로운 비밀번호 입력"
                                        />
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            onClick={() => {
                                                if (newAdminId && newAdminPass) {
                                                    updateCredentials(newAdminId, newAdminPass);
                                                } else {
                                                    alert('아이디와 비밀번호를 모두 입력해주세요.');
                                                }
                                            }}
                                            className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-colors flex justify-center items-center"
                                        >
                                            <Save size={18} className="mr-2" />
                                            변경사항 저장
                                        </button>
                                        <p className="text-center text-xs text-zinc-400 mt-4">
                                            * 변경 시 자동으로 로그아웃됩니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div >
    );
};

export default Dashboard;
