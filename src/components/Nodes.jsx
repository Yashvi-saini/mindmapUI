import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { ChevronRight, ChevronDown } from 'lucide-react';

export const RootNode = memo(({ data, isConnectable }) => {
    return (
        <div className="relative flex justify-center items-center w-40 h-40">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.6)_0%,rgba(59,130,246,0)_70%)] animate-pulse -z-10"></div>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-center font-bold text-lg shadow-[0_10px_25px_-5px_rgba(59,130,246,0.5)] border-4 border-white/10 p-4">
                {data.label}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="opacity-0"
            />
        </div>
    );
});

export const MindMapNode = memo(({ data, isConnectable, selected }) => {
    const isCollapsed = data.isCollapsed;
    const hasChildren = data.childrenCount > 0;

    const handleToggle = (e) => {
        e.stopPropagation(); // prevent node selection
        if (data.onToggle) {
            data.onToggle(data.id);
        }
    };

    return (
        <div className={`min-w-[180px] bg-slate-900 border border-slate-600 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 transition-all duration-200 shadow-sm text-slate-100 relative group hover:border-blue-500 hover:-translate-y-0.5 hover:shadow-lg ${selected ? '!border-blue-500 ring-2 ring-blue-500/20' : ''}`}>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                className="!bg-transparent"
            />

            <div className="flex flex-col text-left">
                <span className="font-medium text-sm">{data.label}</span>
            </div>

            {hasChildren && (
                <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-colors cursor-pointer ${isCollapsed ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600 group-hover:text-white'}`}
                    onClick={handleToggle}
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                </div>
            )}

            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="!bg-transparent"
            />
        </div>
    );
});
