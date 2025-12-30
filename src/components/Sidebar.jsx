import React from 'react';
import { X, BookOpen, Tag, Activity, Plus, Trash2 } from 'lucide-react';

const Sidebar = ({ node, onClose, onEdit, onAdd, onDelete }) => {
    const isOpen = !!node;
    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({ label: '', summary: '' });

    React.useEffect(() => {
        if (node) {
            setFormData({
                label: node.data.label || '',
                summary: node.data.summary || ''
            });
            setIsEditing(false);
        }
    }, [node]);

    const handleSave = () => {
        onEdit(node.id, formData);
        setIsEditing(false);
    };

    const handleAddChild = () => {
        if (onAdd) {
            onAdd(node.id);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            if (window.confirm(`Are you sure you want to delete "${node.data.label}"?`)) {
                onDelete(node.id);
            }
        }
    };

    if (!node) return <div className={`fixed right-0 top-0 h-screen w-[350px] bg-slate-900/95 border-l border-slate-700 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}></div>;

    const { label, summary, description } = node.data;
    const displayDesc = description || summary || "No detailed description available for this node.";

    return (
        <div className={`fixed right-0 top-0 h-screen w-[350px] bg-slate-900/95 border-l border-slate-700 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 overflow-y-auto flex-grow">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-grow">
                        <div className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider flex items-center gap-1">
                            <Tag size={12} /> Mindmap Node
                        </div>

                        {isEditing ? (
                            <input
                                className="w-full bg-slate-800 text-white border border-blue-500 rounded p-1 mb-2 text-lg font-bold outline-none"
                                value={formData.label}
                                onChange={e => setFormData({ ...formData, label: e.target.value })}
                            />
                        ) : (
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">{label}</h2>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2">
                            <button
                                onClick={handleAddChild}
                                className="inline-block px-3 py-1 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer text-xs font-semibold uppercase tracking-wide flex items-center gap-1"
                                title="Add Child Node"
                            >
                                <Plus size={12} /> Add
                            </button>
                            <button
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-500 cursor-pointer text-xs font-semibold uppercase tracking-wide"
                            >
                                {isEditing ? 'Save' : 'Edit'}
                            </button>
                            {!isEditing && (
                                <button
                                    onClick={handleDelete}
                                    className="inline-block px-3 py-1 rounded-full bg-slate-700 text-slate-400 hover:bg-red-900/80 hover:text-red-200 cursor-pointer text-xs font-semibold uppercase tracking-wide flex items-center gap-1 transition-colors"
                                    title="Delete Node"
                                >
                                    <Trash2 size={12} />
                                </button>
                            )}
                            {isEditing && (
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="inline-block px-3 py-1 rounded-full bg-red-900/40 text-red-400 hover:bg-red-900/60 cursor-pointer text-xs font-semibold uppercase tracking-wide"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-4">
                    <label className="text-xs uppercase text-slate-400 font-semibold mb-2 flex items-center gap-2">
                        <BookOpen size={14} /> Summary
                    </label>
                    {isEditing ? (
                        <textarea
                            className="w-full bg-slate-800 text-white border border-slate-600 focus:border-blue-500 rounded p-2 min-h-[100px] text-sm leading-relaxed outline-none resize-none"
                            value={formData.summary}
                            onChange={e => setFormData({ ...formData, summary: e.target.value })}
                        />
                    ) : (
                        <p className="text-[0.95rem] text-slate-200 leading-relaxed">
                            {displayDesc}
                        </p>
                    )}
                </div>

                {/* Dynamic Metadata Section */}
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-4">
                    <label className="text-xs uppercase text-slate-400 font-semibold mb-2 flex items-center gap-2">
                        <Activity size={14} /> Metadata
                    </label>
                    <div className="space-y-3 mt-3">
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span className="text-slate-400 text-sm">ID</span>
                            <span className="text-slate-200 font-mono text-xs">{node.id}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span className="text-slate-400 text-sm">Depth</span>
                            <span className="text-slate-200 font-mono text-xs text-right">Calculated L{node.id.split('-').length}</span>
                        </div>
                        {node.data.childrenCount !== undefined && (
                            <div className="flex justify-between border-b border-slate-700 pb-2">
                                <span className="text-slate-400 text-sm">Children</span>
                                <span className="text-slate-200 font-mono text-xs">{node.data.childrenCount}</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
