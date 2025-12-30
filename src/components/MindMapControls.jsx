import React from 'react';
import { useReactFlow } from 'reactflow';
import { Maximize, ZoomIn, ZoomOut, Download, Expand, Shrink } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useTheme } from '../context/ThemeContext';

const MindMapControls = ({ onExpandAll, onCollapseAll }) => {
    const { fitView, zoomIn, zoomOut } = useReactFlow();
    const { theme } = useTheme();

    const handleDownload = () => {
        const node = document.querySelector('.react-flow__viewport');
        if (node) {
            toPng(node, {
                backgroundColor: theme === 'dark' ? '#0f172a' : '#ffe4e6',
                style: {
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1)',
                },
            })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'mindmap.png';
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.error('Failed to download image', err);
                });
        }
    };

    const isDark = theme === 'dark';

    const containerClass = `absolute top-5 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 rounded-xl border backdrop-blur-md shadow-xl ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-200'
        }`;

    const btnClass = `px-4 py-2 rounded-md text-sm cursor-pointer transition-colors flex items-center gap-2 border shadow-sm ${isDark
            ? 'bg-slate-700 text-white hover:bg-slate-600 border-slate-600'
            : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
        }`;

    const primaryBtnClass = `px-4 py-2 rounded-md text-sm cursor-pointer transition-colors flex items-center gap-2 border shadow-sm ${isDark
            ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-500'
            : 'bg-blue-500 text-white hover:bg-blue-600 border-blue-400'
        }`;

    const separatorClass = `w-[1px] h-9 mx-1 ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`;

    const downloadBtnClass = `px-4 py-2 rounded-md text-sm cursor-pointer transition-colors flex items-center gap-2 border shadow-sm text-white ${isDark
            ? 'bg-emerald-600 hover:bg-emerald-700 border-emerald-500'
            : 'bg-emerald-500 hover:bg-emerald-600 border-emerald-400'
        }`;

    return (
        <div className={containerClass}>
            <button className={primaryBtnClass} onClick={onExpandAll}>
                <Expand size={16} /> Expand All
            </button>
            <button className={btnClass} onClick={onCollapseAll}>
                <Shrink size={16} /> Collapse All
            </button>
            <div className={separatorClass}></div>
            <button className={btnClass} onClick={() => fitView({ padding: 0.2, duration: 800 })}>
                <Maximize size={16} /> Fit View
            </button>
            <button className={btnClass} onClick={() => zoomIn()}>
                <ZoomIn size={16} />
            </button>
            <div className={separatorClass}></div>
            <button className={downloadBtnClass} onClick={handleDownload}>
                <Download size={16} /> Download
            </button>
        </div>
    );
};

export default MindMapControls;
