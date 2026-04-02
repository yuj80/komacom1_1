import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// --- Types ---
export interface PortfolioItem {
    id: number;
    title: string;
    category: 'TV' | 'Radio' | 'PPL' | 'ETC';
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    detailImages?: string[];
    content?: string;
    color: string;
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

export interface ClientItem {
    id: number;
    name: string;
    logoUrl: string;
}

export interface PartnerItem {
    id: number;
    name: string;
    logoUrl: string;
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
    fax: string;
    ceoName: string;
}

interface AdminContextType {
    isAuthenticated: boolean;
    login: (id: string, pass: string) => Promise<boolean>;
    logout: () => Promise<void>;
    updateCredentials: (newId: string, newPass: string) => Promise<void>;

    portfolio: PortfolioItem[];
    addPortfolio: (item: Omit<PortfolioItem, 'id'>) => Promise<void>;
    updatePortfolio: (item: PortfolioItem) => Promise<void>;
    deletePortfolio: (id: number) => Promise<void>;
    reorderPortfolio: (reorderedItems: PortfolioItem[]) => Promise<void>;

    services: ServiceItem[];
    updateService: (item: ServiceItem) => Promise<void>;

    about: AboutData;
    updateAbout: (data: AboutData) => Promise<void>;
    addHistory: (item: Omit<HistoryItem, 'id'>) => Promise<void>;
    updateHistory: (item: HistoryItem) => Promise<void>;
    deleteHistory: (id: number) => Promise<void>;

    contact: ContactData;
    updateContact: (data: ContactData) => Promise<void>;

    clients: ClientItem[];
    addClient: (item: Omit<ClientItem, 'id'>) => Promise<void>;
    updateClient: (item: ClientItem) => Promise<void>;
    deleteClient: (id: number) => Promise<void>;

    partners: PartnerItem[];
    addPartner: (item: Omit<PartnerItem, 'id'>) => Promise<void>;
    updatePartner: (item: PartnerItem) => Promise<void>;
    deletePartner: (id: number) => Promise<void>;
}

// Initial defaults if DB empty
const DEFAULT_ABOUT: AboutData = { slogan: '', description: '', history: [] };
const DEFAULT_CONTACT: ContactData = { introText: '', address: '', email: '', phone: '', fax: '', ceoName: '박용근' };

// Postgres lowercase to JS camelCase Mappers
const mapPortfolio = (p: any): PortfolioItem => ({
    id: p.id,
    title: p.title,
    category: p.category,
    type: p.type,
    url: p.url,
    thumbnail: p.thumbnail,
    detailImages: p.detailimages || p.detailImages || [],
    content: p.content,
    color: p.color
});

const mapService = (s: any): ServiceItem => ({
    id: s.id,
    title: s.title,
    description: s.description,
    subItems: s.subitems || s.subItems || []
});

const mapClient = (c: any): ClientItem => ({
    id: c.id,
    name: c.name,
    logoUrl: c.logourl || c.logoUrl || ''
});

const mapPartner = (p: any): PartnerItem => ({
    id: p.id,
    name: p.name,
    logoUrl: p.logourl || p.logoUrl || ''
});

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [about, setAbout] = useState<AboutData>(DEFAULT_ABOUT);
    const [contact, setContact] = useState<ContactData>(DEFAULT_CONTACT);
    const [clients, setClients] = useState<ClientItem[]>([]);
    const [partners, setPartners] = useState<PartnerItem[]>([]);

    useEffect(() => {
        // Init auth
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        loadAllData();
        
        return () => subscription.unsubscribe();
    }, []);

    const loadAllData = async () => {
        try {
            const [pRes, sRes, hRes, cRes, partRes, setRes] = await Promise.all([
                supabase.from('portfolio').select('*').order('created_at', { ascending: false }),
                supabase.from('services').select('*').order('id', { ascending: true }),
                supabase.from('history').select('*').order('year', { ascending: false }),
                supabase.from('clients').select('*').order('created_at', { ascending: false }),
                supabase.from('partners').select('*').order('created_at', { ascending: false }),
                supabase.from('settings').select('*').limit(1).single()
            ]);

            if (pRes.data) setPortfolio(pRes.data.map(mapPortfolio));
            if (sRes.data) setServices(sRes.data.map(mapService));
            if (cRes.data) setClients(cRes.data.map(mapClient));
            if (partRes.data) setPartners(partRes.data.map(mapPartner));
            
            if (setRes.data) {
                const historyData = (hRes.data || []).map((h: any) => ({
                    id: h.id, year: h.year, title: h.title, desc: h.desc_text
                }));
                // Combine into About
                setAbout({
                    slogan: setRes.data.slogan || '',
                    description: setRes.data.about_description || '',
                    history: historyData
                });
                
                // Combine into Contact
                setContact({
                    introText: setRes.data.contact_intro || '',
                    address: setRes.data.contact_address || '',
                    email: setRes.data.contact_email || '',
                    phone: setRes.data.contact_phone || '',
                    fax: setRes.data.contact_fax || '',
                    ceoName: setRes.data.contact_ceo || '박용근'
                });
            }
        } catch (error) {
            console.error('Error loading Supabase data:', error);
        }
    };

    const login = async (id: string, pass: string) => {
        const emailToLogin = id.includes('@') ? id : `${id}@komacom.co.kr`;
        const { data, error } = await supabase.auth.signInWithPassword({ email: emailToLogin, password: pass });
        if (error) console.error('Login error:', error.message);
        if (data.session) {
            return true;
        }
        return false;
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    const updateCredentials = async (newId: string, newPass: string) => {
        const emailToUpdate = newId.includes('@') ? newId : `${newId}@komacom.co.kr`;
        await supabase.auth.updateUser({ email: emailToUpdate, password: newPass });
        alert('계정 정보가 변경되었습니다. 사이트를 새로고침 한 뒤 새 정보로 다시 로그인해주세요.');
        await logout();
    };

    const addPortfolio = async (item: Omit<PortfolioItem, 'id'>) => {
        const payload: any = { ...item, detailimages: item.detailImages };
        delete payload.detailImages;
        const { data } = await supabase.from('portfolio').insert([payload]).select().single();
        if (data) setPortfolio(prev => [mapPortfolio(data), ...prev]);
    };
    
    const updatePortfolio = async (item: PortfolioItem) => {
        const { id, created_at, ...rest } = item as any;
        const payload: any = { ...rest, detailimages: rest.detailImages };
        delete payload.detailImages;
        
        const { data, error } = await supabase.from('portfolio').update(payload).eq('id', item.id).select().single();
        if (error) {
            console.error('Supabase Update Error:', error);
            alert(`업데이트 실패: ${error.message}`);
        }
        if (data) setPortfolio(prev => prev.map(p => p.id === data.id ? mapPortfolio(data) : p));
    };
    
    const deletePortfolio = async (id: number) => {
        await supabase.from('portfolio').delete().eq('id', id);
        setPortfolio(prev => prev.filter(p => p.id !== id));
    };

    const reorderPortfolio = async (reorderedItems: PortfolioItem[]) => {
        // Optimistic UI update
        setPortfolio(reorderedItems);

        // Calculate new timestamps to persist order (sort by created_at DESC)
        // We use the current timestamp as a base and subtract minutes for each item to maintain order.
        const baseTime = Date.now();
        
        const upsertPayload = reorderedItems.map((item, index) => {
            const payload: any = { ...item, detailimages: item.detailImages };
            delete payload.detailImages;
            // Ensure strict descending order by subtracting time per index
            payload.created_at = new Date(baseTime - (index * 60000)).toISOString();
            return payload;
        });

        const { error } = await supabase.from('portfolio').upsert(upsertPayload);
        if (error) {
            console.error('Reorder error:', error.message);
            alert(`순서 변경 실패: ${error.message}`);
            // Fallback to reload
            loadAllData();
        }
    };

    const updateService = async (item: ServiceItem) => {
        const { id, created_at, ...rest } = item as any;
        const payload: any = { ...rest, subitems: rest.subItems };
        delete payload.subItems;

        const { data } = await supabase.from('services').update(payload).eq('id', item.id).select().single();
        if (data) setServices(prev => prev.map(s => s.id === data.id ? mapService(data) : s));
    };

    const updateAbout = async (data: AboutData) => {
        await supabase.from('settings').update({
            slogan: data.slogan,
            about_description: data.description
        }).eq('id', 1);
        setAbout(prev => ({ ...prev, slogan: data.slogan, description: data.description }));
    };

    const addHistory = async (item: Omit<HistoryItem, 'id'>) => {
        const mappedItem = { year: item.year, title: item.title, desc_text: item.desc };
        const { data } = await supabase.from('history').insert([mappedItem]).select().single();
        if (data) {
            const added = { id: data.id, year: data.year, title: data.title, desc: data.desc_text };
            setAbout(prev => ({ ...prev, history: [added, ...prev.history].sort((a, b) => parseInt(b.year) - parseInt(a.year)) }));
        }
    };
    
    const updateHistory = async (item: HistoryItem) => {
        const mappedItem = { year: item.year, title: item.title, desc_text: item.desc };
        const { data } = await supabase.from('history').update(mappedItem).eq('id', item.id).select().single();
        if (data) {
            const updated = { id: data.id, year: data.year, title: data.title, desc: data.desc_text };
            setAbout(prev => ({ ...prev, history: prev.history.map(h => h.id === data.id ? updated : h).sort((a, b) => parseInt(b.year) - parseInt(a.year)) }));
        }
    };
    
    const deleteHistory = async (id: number) => {
        await supabase.from('history').delete().eq('id', id);
        setAbout(prev => ({ ...prev, history: prev.history.filter(h => h.id !== id) }));
    };

    const updateContact = async (data: ContactData) => {
        await supabase.from('settings').update({
            contact_intro: data.introText,
            contact_address: data.address,
            contact_email: data.email,
            contact_phone: data.phone,
            contact_fax: data.fax,
            contact_ceo: data.ceoName
        }).eq('id', 1);
        setContact(data);
    };

    const addClient = async (item: Omit<ClientItem, 'id'>) => {
        const payload: any = { ...item, logourl: item.logoUrl };
        delete payload.logoUrl;
        
        const { data } = await supabase.from('clients').insert([payload]).select().single();
        if (data) setClients(prev => [mapClient(data), ...prev]);
    };
    
    const updateClient = async (item: ClientItem) => {
         const { id, created_at, ...rest } = item as any;
         const payload: any = { ...rest, logourl: rest.logoUrl };
         delete payload.logoUrl;
         
        const { data } = await supabase.from('clients').update(payload).eq('id', item.id).select().single();
        if (data) setClients(prev => prev.map(c => c.id === data.id ? mapClient(data) : c));
    };
    
    const deleteClient = async (id: number) => {
        await supabase.from('clients').delete().eq('id', id);
        setClients(prev => prev.filter(c => c.id !== id));
    };

    const addPartner = async (item: Omit<PartnerItem, 'id'>) => {
        const payload: any = { ...item, logourl: item.logoUrl };
        delete payload.logoUrl;
        
        const { data } = await supabase.from('partners').insert([payload]).select().single();
        if (data) setPartners(prev => [mapPartner(data), ...prev]);
    };
    
    const updatePartner = async (item: PartnerItem) => {
         const { id, created_at, ...rest } = item as any;
         const payload: any = { ...rest, logourl: rest.logoUrl };
         delete payload.logoUrl;
         
        const { data } = await supabase.from('partners').update(payload).eq('id', item.id).select().single();
        if (data) setPartners(prev => prev.map(p => p.id === data.id ? mapPartner(data) : p));
    };
    
    const deletePartner = async (id: number) => {
        await supabase.from('partners').delete().eq('id', id);
        setPartners(prev => prev.filter(p => p.id !== id));
    };

    return (
        <AdminContext.Provider value={{
            isAuthenticated, login, logout, updateCredentials,
            portfolio, addPortfolio, updatePortfolio, deletePortfolio, reorderPortfolio,
            services, updateService,
            about, updateAbout, addHistory, deleteHistory, updateHistory,
            contact, updateContact,
            clients, addClient, updateClient, deleteClient,
            partners, addPartner, updatePartner, deletePartner
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
