import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PlayCircle, Image as ImageIcon, Edit2, Trash2, GripVertical } from 'lucide-react';
import type { PortfolioItem } from '../../context/AdminContext';

interface Props {
    item: PortfolioItem;
    onEdit: (item: PortfolioItem) => void;
    onDelete: (id: number) => void;
}

export const SortablePortfolioItem: React.FC<Props> = ({ item, onEdit, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden group hover:shadow-md transition-shadow relative">
            <div className={`h-40 bg-gradient-to-br ${item.color} flex items-center justify-center relative`}>
                {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                ) : null}
                
                {item.type === 'video' ? <PlayCircle className="text-white opacity-80 z-10" size={48} /> : <ImageIcon className="text-white opacity-80 z-10" size={48} />}
                
                <div className="absolute top-2 left-2 flex space-x-2 bg-black/50 p-1.5 rounded-lg backdrop-blur-sm cursor-grab active:cursor-grabbing text-white" {...attributes} {...listeners}>
                    <GripVertical size={20} />
                </div>

                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-2 rounded-lg backdrop-blur-sm z-20">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(item); }} className="text-white hover:text-blue-400 p-1"><Edit2 size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} className="text-white hover:text-red-400 p-1"><Trash2 size={16} /></button>
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
    );
};
