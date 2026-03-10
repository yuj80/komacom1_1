import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { ArrowLeft } from 'lucide-react';

const PortfolioDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { portfolio } = useAdmin();
    const navigate = useNavigate();

    const project = portfolio.find(p => p.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-white text-zinc-900">
                <h1 className="text-3xl font-bold mb-4">프로젝트를 찾을 수 없습니다.</h1>
                <button onClick={() => navigate('/portfolio')} className="px-6 py-2 bg-black text-white rounded-full font-bold">목록으로 돌아가기</button>
            </div>
        );
    }

    const getYoutubeEmbedUrl = (url: string) => {
        if (!url) return '';
        const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
        return ytMatch && ytMatch[1] ? `https://www.youtube.com/embed/${ytMatch[1]}` : url;
    };

    return (
        <div className="bg-white text-zinc-900 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Header */}
                <div className="mb-10 text-center">
                    <span className="inline-block px-4 py-1.5 bg-zinc-100 text-zinc-600 rounded-full text-sm font-bold mb-4 border border-zinc-200">
                        {project.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">{project.title}</h1>
                </div>

                {/* Main Media (Video) */}
                {project.type === 'video' && project.url && (
                    <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-12 border border-zinc-200">
                        <iframe
                            src={getYoutubeEmbedUrl(project.url)}
                            title="YouTube video player"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}

                {/* Main Media (Image) */}
                {project.type === 'image' && project.url && (
                    <div className="w-full rounded-2xl overflow-hidden mb-12 shadow-lg border border-zinc-100">
                        <img src={project.url} alt={project.title} className="w-full h-auto object-cover" />
                    </div>
                )}

                {/* Content */}
                {project.content && (
                    <div className="max-w-3xl mx-auto mb-16 text-lg leading-relaxed text-zinc-800 whitespace-pre-wrap">
                        {project.content}
                    </div>
                )}

                {/* Detail Images Stack */}
                {project.detailImages && project.detailImages.length > 0 && (
                    <div className="flex flex-col gap-6 md:gap-10 mb-16 items-center">
                        {project.detailImages.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                alt={`${project.title} detail ${index + 1}`}
                                className="w-full rounded-2xl shadow-md border border-zinc-100 object-cover"
                            />
                        ))}
                    </div>
                )}

                {/* Footer Navigation */}
                <div className="flex justify-center border-t border-zinc-200 pt-12">
                    <button
                        onClick={() => navigate('/portfolio')}
                        className="flex items-center gap-2 px-8 py-3.5 bg-zinc-900 hover:bg-black text-white font-bold rounded-full transition-transform hover:scale-105 shadow-xl"
                    >
                        <ArrowLeft size={18} />
                        목록으로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetail;
