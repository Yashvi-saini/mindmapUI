import React from 'react';
import { X, BookOpen, Tag, Activity, Plus, Trash2 } from 'lucide-react';

const Sidebar = ({ node, onClose, onEdit, onAdd, onDelete, theme }) => {
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

    const isDark = theme === 'dark';

    if (!node) return <div className={`fixed right-0 top-0 h-screen w-[350px] border-l backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${isDark ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-slate-200'}`}></div>;

    const { label, summary, description } = node.data;
    const displayDesc = description || summary || "No detailed description available for this node.";

    return (
        <div className={`fixed right-0 top-0 h-screen w-[350px] border-l backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${isDark ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-slate-200'}`}>
            <div className="p-6 overflow-y-auto flex-grow">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-grow">
                        <div className={`text-xs font-bold mb-2 uppercase tracking-wider flex items-center gap-1 ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>
                            <Tag size={12} /> Mindmap Node
                        </div>

                        {isEditing ? (
                            <input
                                className={`w-full border border-blue-500 rounded p-1 mb-2 text-lg font-bold outline-none ${isDark ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-800'}`}
                                value={formData.label}
                                onChange={e => setFormData({ ...formData, label: e.target.value })}
                            />
                        ) : (
                            <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-2 ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-600 to-indigo-600'}`}>{label}</h2>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2">
                            <button
                                onClick={handleAddChild}
                                className={`inline-block px-3 py-1 rounded-full text-white cursor-pointer text-xs font-semibold uppercase tracking-wide flex items-center gap-1 ${isDark ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                                title="Add Child Node"
                            >
                                <Plus size={12} /> Add
                            </button>
                            <button
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`inline-block px-3 py-1 rounded-full text-white cursor-pointer text-xs font-semibold uppercase tracking-wide ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                            >
                                {isEditing ? 'Save' : 'Edit'}
                            </button>
                            {!isEditing && (
                                <button
                                    onClick={handleDelete}
                                    className={`inline-block px-3 py-1 rounded-full cursor-pointer text-xs font-semibold uppercase tracking-wide flex items-center gap-1 transition-colors ${isDark ? 'bg-slate-700 text-slate-400 hover:bg-red-900/80 hover:text-red-200' : 'bg-slate-200 text-slate-500 hover:bg-red-100 hover:text-red-600'}`}
                                    title="Delete Node"
                                >
                                    <Trash2 size={12} />
                                </button>
                            )}
                            {isEditing && (
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className={`inline-block px-3 py-1 rounded-full cursor-pointer text-xs font-semibold uppercase tracking-wide ${isDark ? 'bg-red-900/40 text-red-400 hover:bg-red-900/60' : 'bg-red-100 text-red-500 hover:bg-red-200'}`}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'}`}>
                        <X size={20} />
                    </button>
                </div>

                <div className={`border rounded-lg p-4 mb-4 ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <label className={`text-xs uppercase font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                        <BookOpen size={14} /> Summary
                    </label>
                    {isEditing ? (
                        <textarea
                            className={`w-full border focus:border-blue-500 rounded p-2 min-h-[100px] text-sm leading-relaxed outline-none resize-none ${isDark ? 'bg-slate-800 text-white border-slate-600' : 'bg-slate-100 text-slate-800 border-slate-300'}`}
                            value={formData.summary}
                            onChange={e => setFormData({ ...formData, summary: e.target.value })}
                        />
                    ) : (
                        <p className={`text-[0.95rem] leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                            {displayDesc}
                        </p>
                    )}
                </div>

                {/* Metadata  */}
                <div className={`border rounded-lg p-4 mb-4 ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <label className={`text-xs uppercase font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                        <Activity size={14} /> Metadata
                    </label>
                    <div className="space-y-3 mt-3">
                        <div className={`flex justify-between border-b pb-2 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ID</span>
                            <span className={`font-mono text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{node.id}</span>
                        </div>
                        <div className={`flex justify-between border-b pb-2 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Depth</span>
                            <span className={`font-mono text-xs text-right ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Calculated L{node.id.split('-').length}</span>
                        </div>
                        {node.data.childrenCount !== undefined && (
                            <div className={`flex justify-between border-b pb-2 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Children</span>
                                <span className={`font-mono text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{node.data.childrenCount}</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
