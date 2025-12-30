import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const RootNode = memo(({ data, isConnectable }) => {
    return (
        <div className="relative flex justify-center items-center w-48 h-48 group">
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse -z-10 group-hover:bg-blue-400/30 transition-colors duration-500"></div>

            {/* Main Circle */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white flex items-center justify-center text-center font-bold text-xl shadow-[0_0_40px_-5px_rgba(59,130,246,0.6)] border-4 border-white/20 p-6 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                <span className="drop-shadow-md">{data.label}</span>
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
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleToggle = (e) => {
        e.stopPropagation(); // prevent node selection
        if (data.onToggle) {
            data.onToggle(data.id);
        }
    };

    return (
        <div className={`min-w-[200px] max-w-[300px] backdrop-blur-md border rounded-2xl px-5 py-3 flex items-center justify-between gap-4 transition-all duration-300 shadow-lg relative group hover:-translate-y-1 ${isDark
                ? 'bg-slate-800/90 border-slate-700/50 hover:shadow-blue-500/20 hover:border-blue-500/50'
                : 'bg-white/90 border-slate-200 hover:shadow-blue-500/20 hover:border-blue-500/50'
            } ${selected
                ? (isDark ? 'bg-slate-800 border-blue-500 ring-2 ring-blue-500/30 shadow-blue-500/40' : 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/30 shadow-blue-500/40')
                : (isDark ? 'text-slate-100' : 'text-slate-700')
            }`}>

            <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-lg transition-colors ${selected
                    ? 'bg-blue-500'
                    : (isDark ? 'bg-slate-600 group-hover:bg-blue-400' : 'bg-slate-300 group-hover:bg-blue-400')
                }`}></div>

            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                className="!bg-transparent !w-2 !h-full !border-none !rounded-none !left-0 !top-0 !transform-none opacity-0"
            />

            <div className="flex flex-col text-left pl-3 flex-grow relative">
                <span className={`font-semibold text-sm tracking-wide ${selected
                        ? (isDark ? 'text-blue-200' : 'text-blue-700')
                        : (isDark ? 'text-slate-200' : 'text-slate-800')
                    }`}>{data.label}</span>

                {/* Hover Tooltip for Summary */}
                {data.summary && (
                    <div className={`absolute bottom-full left-0 mb-3 w-48 text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border shadow-xl backdrop-blur-sm z-50 ${isDark
                            ? 'bg-slate-900/95 text-slate-200 border-slate-700'
                            : 'bg-white/95 text-slate-700 border-slate-200'
                        }`}>
                        {data.summary}
                        {/* Little arrow pointing down */}
                        <div className={`absolute -bottom-1 left-4 w-2 h-2 border-r border-b transform rotate-45 ${isDark
                                ? 'bg-slate-900/95 border-slate-700'
                                : 'bg-white/95 border-slate-200'
                            }`}></div>
                    </div>
                )}
            </div>

            {hasChildren && (
                <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all duration-300 cursor-pointer shadow-sm z-10 
                    ${isCollapsed
                            ? 'bg-blue-500 text-white hover:bg-blue-400 rotate-0'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-slate-300 dark:group-hover:bg-slate-600 dark:group-hover:text-white rotate-90'
                        }`}
                    onClick={handleToggle}
                >
                    <ChevronRight size={14} className={`transition-transform duration-300 ${isCollapsed ? '' : 'rotate-90'}`} />
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
